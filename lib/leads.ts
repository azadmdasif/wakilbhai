import { z } from 'zod';

/**
 * Lead storage abstraction. Currently forwards to Web3Forms (same inbox as
 * the legacy site forms); swap `storeLead` internals for a real DB later.
 */
export const leadSchema = z.object({
  name: z.string().min(1).max(120),
  phone: z
    .string()
    .regex(/^[+]?[0-9][0-9\s-]{7,14}$/, 'valid phone number expected'),
  locale: z.enum(['en', 'hi', 'ur', 'bn']),
  source: z.string().min(1).max(300),
  context: z.string().max(2000).optional(),
});

export type Lead = z.infer<typeof leadSchema>;

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
// Public site key (also embedded in the legacy client bundle).
const WEB3FORMS_ACCESS_KEY = process.env.WEB3FORMS_ACCESS_KEY ?? 'b9f95d5b-8f90-477b-a068-55293c654708';

export async function storeLead(lead: Lead): Promise<{ ok: boolean; error?: string }> {
  try {
    const response = await fetch(WEB3FORMS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: `Lead: ${lead.source}`,
        from_name: 'WakilBhai Website',
        name: lead.name,
        phone: lead.phone,
        locale: lead.locale,
        source: lead.source,
        context: lead.context ?? '',
        submitted_at: new Date().toISOString(),
      }),
    });
    const json = (await response.json()) as { success: boolean; message?: string };
    return json.success ? { ok: true } : { ok: false, error: json.message };
  } catch {
    return { ok: false, error: 'lead-provider-unreachable' };
  }
}
