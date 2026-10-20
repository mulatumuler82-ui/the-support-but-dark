import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';

/** Adds the "in" class once the element scrolls into view. */
export default function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`pf-reveal ${shown ? 'in' : ''} ${className}`}
      style={{ ['--d' as string]: `${delay}s` }}
    >
      {children}
    </div>
  );
}
