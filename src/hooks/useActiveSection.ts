import { useEffect, useState } from 'react';

/**
 * Tracks which page section is currently in view, for nav highlighting.
 * A section becomes "active" when it crosses a horizontal band around 40% of
 * the viewport height, which feels natural on both phones and desktops.
 */
export function useActiveSection(ids: readonly string[]): string {
  const [active, setActive] = useState<string>(ids[0] ?? '');

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

/** Smoothly scrolls to a section, honouring reduced-motion preferences. */
export function scrollToSection(id: string): void {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  // Keep the URL shareable without triggering a jump.
  history.replaceState(null, '', id === 'home' ? window.location.pathname : `#${id}`);
}
