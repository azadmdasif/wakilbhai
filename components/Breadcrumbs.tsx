import Link from 'next/link';

export interface Crumb {
  label: string;
  href?: string;
}

export default function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-gray-400 mb-4">
      <ol className="flex flex-wrap items-center gap-1">
        {crumbs.map((crumb, index) => (
          <li key={index} className="flex items-center gap-1">
            {index > 0 && <span aria-hidden>›</span>}
            {crumb.href ? (
              <Link href={crumb.href} className="hover:text-brand-gold transition-colors">
                {crumb.label}
              </Link>
            ) : (
              <span className="text-gray-300">{crumb.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
