import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.mdx',
  ],
  theme: {
    extend: {
      colors: {
        'brand-dark': '#030712',
        'brand-red': '#DC2626',
        'brand-gold': '#FBBF24',
        whatsapp: '#25D366',
      },
      fontFamily: {
        // Both vars are set per-locale by localeFontClass() (lib/fonts.ts):
        //   --font-body    = Noto Sans {Script}   (Nastaliq for ur)
        //   --font-display = Anek {Script}        (Nastaliq for ur)
        // Body falls back to the display face (covers ur, which sets only
        // --font-display), then to system sans.
        sans: ['var(--font-body)', 'var(--font-display)', 'ui-sans-serif', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-body)', 'ui-sans-serif', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;
