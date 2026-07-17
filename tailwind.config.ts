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
        // --font-script is only set on non-Latin locale routes; the var()
        // fallback keeps the declaration valid on the en route.
        sans: ['var(--font-sans)', 'var(--font-script, ui-sans-serif)', 'ui-sans-serif', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-script, ui-sans-serif)', 'ui-sans-serif', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;
