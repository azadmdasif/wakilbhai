'use client';

import Link from 'next/link';
import { trackEvent } from '@/lib/analytics';

interface TrackedLinkProps {
  href: string;
  event: 'cta_click' | 'whatsapp_click';
  props?: Record<string, string | number | boolean>;
  external?: boolean;
  className?: string;
  children: React.ReactNode;
  ariaLabel?: string;
}

/** Link/anchor that fires a funnel event on click. */
export default function TrackedLink({ href, event, props, external, className, children, ariaLabel }: TrackedLinkProps) {
  const onClick = () => trackEvent(event, props);
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" onClick={onClick} className={className} aria-label={ariaLabel}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} onClick={onClick} className={className} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}
