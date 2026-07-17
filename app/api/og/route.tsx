import { ImageResponse } from 'next/og';
import { SITE_NAME } from '@/lib/site';

export const runtime = 'edge';

// Brand palette (CLAUDE.md design system).
const PAPER = '#FAF8F3';
const INK = '#1A1D23';
const RED = '#E11D2E';
const MUTED = '#6B7280';

const WIDTH = 1200;
const HEIGHT = 630;

// Fonts are bundled (no runtime network dependency). Latin only for now —
// Indic/Urdu titles need their Noto fonts added to the `fonts` array below.
const fontBold = fetch(new URL('./fonts/Inter-800.ttf', import.meta.url)).then((r) => r.arrayBuffer());
const fontMedium = fetch(new URL('./fonts/Inter-500.ttf', import.meta.url)).then((r) => r.arrayBuffer());

/**
 * Pick a title size + truncation budget so the headline fills the card in at
 * most three lines. Longer titles step down in size; anything past the budget
 * is cut on a word boundary and ellipsised.
 */
function fitTitle(raw: string): { text: string; fontSize: number } {
  const title = raw.trim() || SITE_NAME;
  const len = title.length;
  const fontSize = len <= 45 ? 68 : len <= 90 ? 56 : 46;
  // ~content-width / (fontSize * avg glyph width) chars per line, × 3 lines.
  const perLine = Math.floor((WIDTH - 144) / (fontSize * 0.52));
  const budget = perLine * 3;
  if (title.length <= budget) return { text: title, fontSize };
  const cut = title.slice(0, budget - 1);
  const lastSpace = cut.lastIndexOf(' ');
  return { text: `${lastSpace > 40 ? cut.slice(0, lastSpace) : cut}…`, fontSize };
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const { text: title, fontSize } = fitTitle(searchParams.get('title') ?? '');
  const category = searchParams.get('category')?.trim();

  const [bold, medium] = await Promise.all([fontBold, fontMedium]);

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: PAPER,
          padding: '64px 72px',
          fontFamily: 'Inter',
        }}
      >
        {/* Brand row: red accent bar + wordmark */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ display: 'flex', width: 10, height: 44, backgroundColor: RED, borderRadius: 2, marginRight: 20 }} />
          <div style={{ display: 'flex', fontSize: 40, fontWeight: 800, color: INK, letterSpacing: '-0.01em' }}>
            {SITE_NAME}
          </div>
        </div>

        {/* Headline — up to 3 lines */}
        <div style={{ display: 'flex', maxHeight: fontSize * 3.5, overflow: 'hidden' }}>
          <div style={{ display: 'flex', fontSize, fontWeight: 800, color: INK, lineHeight: 1.12, letterSpacing: '-0.02em' }}>
            {title}
          </div>
        </div>

        {/* Bottom row: stamp chip (category) left, domain right */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          {category ? (
            <div
              style={{
                display: 'flex',
                border: `1.5px solid ${INK}`,
                borderRadius: 4,
                padding: '10px 22px',
                transform: 'rotate(-1deg)',
                color: INK,
                fontSize: 26,
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}
            >
              {category}
            </div>
          ) : (
            <div style={{ display: 'flex' }} />
          )}
          <div style={{ display: 'flex', fontSize: 28, fontWeight: 500, color: MUTED }}>wakilbhai.com</div>
        </div>
      </div>
    ),
    {
      width: WIDTH,
      height: HEIGHT,
      fonts: [
        { name: 'Inter', data: bold, weight: 800, style: 'normal' },
        { name: 'Inter', data: medium, weight: 500, style: 'normal' },
      ],
      headers: {
        'Cache-Control': 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400',
      },
    },
  );
}
