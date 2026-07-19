import { NextRequest, NextResponse } from 'next/server';
import { serviceLeadSchema, appendLeadFile, storeLead } from '@/lib/leads';
import { buildWhatsAppUrl, whatsAppMessage } from '@/lib/whatsapp';

/**
 * Service-order lead: store the details, then respond with a WhatsApp deep link
 * (prefilled with the caller's name + city) so the visitor is never dead-ended
 * — the link is returned even if storage fails.
 */
export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid-json' }, { status: 400 });
  }

  const parsed = serviceLeadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: 'invalid-lead' }, { status: 422 });
  }
  const lead = parsed.data;

  // WhatsApp deep link with name + city filled in — returned regardless of store outcome.
  const whatsappUrl = buildWhatsAppUrl(
    whatsAppMessage(lead.locale, {
      kind: 'serviceOrder',
      title: lead.serviceTitle,
      priceINR: lead.priceINR,
      name: lead.name,
      city: lead.city,
    }),
  );

  // Store: local JSON-lines file (stand-in table) + durable Web3Forms inbox.
  appendLeadFile(lead);
  await storeLead({
    name: lead.name,
    phone: lead.phone,
    locale: lead.locale,
    source: `service:${lead.serviceId}`,
    context: `City: ${lead.city} · ₹${lead.priceINR} · ${lead.serviceTitle}`,
  });

  return NextResponse.json({ ok: true, whatsappUrl });
}
