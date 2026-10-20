import { useRef } from 'react';
import type { PointerEvent, ReactNode } from 'react';

/** Card with a cursor-following glow and a gentle 3D tilt. */
export default function TiltCard({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || e.pointerType === 'touch') return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    el.style.setProperty('--mx', `${x}px`);
    el.style.setProperty('--my', `${y}px`);
    const rx = (0.5 - y / r.height) * 5;
    const ry = (x / r.width - 0.5) * 5;
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = '';
  };

  return (
    <div ref={ref} onPointerMove={onMove} onPointerLeave={onLeave} className="pf-card h-full flex flex-col">
      {children}
    </div>
  );
}
