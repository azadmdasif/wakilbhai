'use client';

import Link from 'next/link';
import { trackEvent, type EventMap, type EventName } from '@/lib/analytics';

interface TrackedLinkProps<K extends EventName> {
  href: string;
  event: K;
  props: EventMap[K];
  external?: boolean;
  className?: string;
  children: React.ReactNode;
  ariaLabel?: string;
}

/** Link/anchor that fires a typed funnel event on click. */
export default function TrackedLink<K extends EventName>({
  href,
  event,
  props,
  external,
  className,
  children,
  ariaLabel,
}: TrackedLinkProps<K>) {
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
