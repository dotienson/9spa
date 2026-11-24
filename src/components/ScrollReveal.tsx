import React, { useEffect, useRef, useState } from 'react';

type RevealTag = 'div' | 'section' | 'footer';
type RevealDelay = 0 | 1 | 2 | 3;

interface ScrollRevealProps {
  children: React.ReactNode;
  as?: RevealTag;
  delay?: RevealDelay;
  className?: string;
}

const DELAY_CLASS_MAP: Record<RevealDelay, string> = {
  0: '',
  1: 'scroll-reveal-delay-1',
  2: 'scroll-reveal-delay-2',
  3: 'scroll-reveal-delay-3',
};

export default function ScrollReveal({
  children,
  as = 'div',
  delay = 0,
  className = '',
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    if (!('IntersectionObserver' in window)) return true;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    if (isVisible) return;
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(node);
            break;
          }
        }
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [isVisible]);

  const combinedClassName = [
    'scroll-reveal',
    DELAY_CLASS_MAP[delay],
    isVisible ? 'is-visible' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (as === 'section') {
    return (
      <section ref={ref as React.RefObject<HTMLElement>} className={combinedClassName}>
        {children}
      </section>
    );
  }

  if (as === 'footer') {
    return (
      <footer ref={ref as React.RefObject<HTMLElement>} className={combinedClassName}>
        {children}
      </footer>
    );
  }

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className={combinedClassName}>
      {children}
    </div>
  );
}
