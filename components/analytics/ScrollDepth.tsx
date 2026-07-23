'use client';

import { useEffect, useRef } from 'react';
import { trackEvent } from '@/lib/analytics';

/**
 * Fires `scroll_75{slug}` once, the first time the reader passes 75% depth of
 * the page. A strong "did they actually read it?" signal for guides and tools.
 * Renders nothing; respects DNT via the analytics layer.
 */
export default function ScrollDepth({ slug }: { slug: string }) {
  const fired = useRef(false);
  useEffect(() => {
    const onScroll = () => {
      if (fired.current) return;
      const total = document.documentElement.scrollHeight;
      const seen = window.scrollY + window.innerHeight;
      if (total > 0 && seen / total >= 0.75) {
        fired.current = true;
        trackEvent('scroll_75', { slug });
        window.removeEventListener('scroll', onScroll);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // short pages may already be past 75%
    return () => window.removeEventListener('scroll', onScroll);
  }, [slug]);
  return null;
}
