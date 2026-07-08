import Link from 'next/link';

// Locale isn't available in not-found; show a compact multilingual message.
export default function NotFound() {
  return (
    <div className="text-center py-24">
      <p className="text-7xl font-extrabold text-brand-gold font-display mb-4">404</p>
      <h1 className="text-3xl font-bold text-white font-display mb-2">Page not found</h1>
      <p className="text-gray-400 mb-2">The page you are looking for does not exist or has moved.</p>
      <p className="text-gray-400 mb-8" lang="hi">
        यह पेज मौजूद नहीं है या हटा दिया गया है।
      </p>
      <Link
        href="/"
        className="inline-block font-bold py-3 px-8 rounded-full text-lg bg-brand-red text-white hover:bg-red-700 transition-colors"
      >
        WakilBhai Home
      </Link>
    </div>
  );
}
