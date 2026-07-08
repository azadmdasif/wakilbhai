import { NextRequest } from 'next/server';
import { z } from 'zod';
import { buildSystemPrompt, MAX_USER_TURNS } from '@/lib/assistant';
import { rateLimit } from '@/lib/rate-limit';
import { isLocale } from '@/lib/i18n';

// Server-side only: the Gemini key must never reach the client bundle.
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const MODEL = 'gemini-2.0-flash';

const bodySchema = z.object({
  locale: z.string(),
  messages: z
    .array(z.object({ role: z.enum(['user', 'assistant']), text: z.string().min(1).max(2000) }))
    .min(1)
    .max(2 * MAX_USER_TURNS + 2),
});

export async function POST(req: NextRequest) {
  if (!GEMINI_API_KEY) {
    return new Response(JSON.stringify({ error: 'assistant-unconfigured' }), { status: 503 });
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (!rateLimit(`ask:${ip}`, 10, 60_000)) {
    return new Response(JSON.stringify({ error: 'rate-limited' }), { status: 429 });
  }

  let parsed;
  try {
    parsed = bodySchema.safeParse(await req.json());
  } catch {
    return new Response(JSON.stringify({ error: 'invalid-json' }), { status: 400 });
  }
  if (!parsed.success) {
    return new Response(JSON.stringify({ error: 'invalid-body' }), { status: 422 });
  }
  const { messages } = parsed.data;
  const locale = isLocale(parsed.data.locale) ? parsed.data.locale : 'en';

  // Hard cap: after MAX_USER_TURNS user messages, force the WhatsApp handoff
  // without calling the model.
  const userTurns = messages.filter((m) => m.role === 'user').length;
  if (userTurns > MAX_USER_TURNS) {
    return new Response(JSON.stringify({ error: 'turn-cap' }), { status: 409 });
  }

  const upstream = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:streamGenerateContent?alt=sse&key=${GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: buildSystemPrompt(locale) }] },
        contents: messages.map((m) => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.text }],
        })),
        generationConfig: { temperature: 0.4, maxOutputTokens: 512 },
      }),
    },
  );

  if (!upstream.ok || !upstream.body) {
    return new Response(JSON.stringify({ error: 'upstream-failed' }), { status: 502 });
  }

  // Re-emit Gemini's SSE stream as a plain text stream.
  const reader = upstream.body.getReader();
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  let buffer = '';

  const stream = new ReadableStream({
    async pull(controller) {
      const { done, value } = await reader.read();
      if (done) {
        controller.close();
        return;
      }
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() ?? '';
      for (const line of lines) {
        if (!line.startsWith('data:')) continue;
        const payload = line.slice(5).trim();
        if (!payload || payload === '[DONE]') continue;
        try {
          const json = JSON.parse(payload) as {
            candidates?: { content?: { parts?: { text?: string }[] } }[];
          };
          const text = json.candidates?.[0]?.content?.parts?.map((p) => p.text ?? '').join('') ?? '';
          if (text) controller.enqueue(encoder.encode(text));
        } catch {
          // partial JSON across chunks is buffered above; ignore bad lines
        }
      }
    },
    cancel() {
      reader.cancel();
    },
  });

  return new Response(stream, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' },
  });
}
