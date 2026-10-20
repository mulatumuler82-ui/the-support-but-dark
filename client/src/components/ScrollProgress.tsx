import { useEffect, useRef } from 'react';

/** Thin gradient bar at the top of the page that fills as you scroll. */
export default function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      if (ref.current) ref.current.style.transform = `scaleX(${p})`;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-[70] pointer-events-none">
      <div ref={ref} className="pf-progress h-full origin-left" style={{ transform: 'scaleX(0)' }} />
    </div>
  );
}
