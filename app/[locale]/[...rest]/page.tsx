import { notFound } from 'next/navigation';

// Catch-all: any path not matched by a real route renders the locale-aware
// 404 (app/[locale]/not-found.tsx) inside the styled layout. The middleware
// rewrites unprefixed paths into /{locale}/... territory, so unknown locale
// prefixes also land here (e.g. /fr/x -> /en/fr/x).
export default function CatchAll() {
  notFound();
}
