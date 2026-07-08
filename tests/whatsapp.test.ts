import { describe, expect, it } from 'vitest';
import { buildWhatsAppUrl, whatsAppMessage, whatsAppUrlFor } from '@/lib/whatsapp';
import { locales } from '@/lib/i18n';

describe('whatsapp url builder', () => {
  it('builds a bare link without message', () => {
    expect(buildWhatsAppUrl()).toBe('https://wa.me/917686022245');
  });

  it('encodes the message', () => {
    const url = buildWhatsAppUrl('hello & नमस्ते');
    expect(url).toBe(`https://wa.me/917686022245?text=${encodeURIComponent('hello & नमस्ते')}`);
  });

  it('fills guide context into every locale', () => {
    for (const locale of locales) {
      const msg = whatsAppMessage(locale, { kind: 'guide', title: 'Cheque bounce', url: 'https://x/y' });
      expect(msg).toContain('Cheque bounce');
      expect(msg).toContain('https://x/y');
    }
  });

  it('fills service price', () => {
    const msg = whatsAppMessage('hi', { kind: 'service', title: 'नोटिस', priceINR: 999 });
    expect(msg).toContain('999');
    expect(msg).toContain('नोटिस');
  });

  it('produces a valid URL for search misses with quotes', () => {
    const url = whatsAppUrlFor('en', { kind: 'searchMiss', query: 'cheque "bounce"' });
    expect(url.startsWith('https://wa.me/917686022245?text=')).toBe(true);
    expect(decodeURIComponent(url.split('text=')[1])).toContain('cheque "bounce"');
  });
});
