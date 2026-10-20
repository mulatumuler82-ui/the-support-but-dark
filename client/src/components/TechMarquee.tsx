import { TECH } from '../data/site';

export default function TechMarquee() {
  return (
    <div className="pf-marquee border-y border-[#1C2340] py-5" aria-label="Technologies I work with">
      <div className="pf-track">
        {[...TECH, ...TECH].map((t, i) => (
          <span key={`${t}-${i}`} className="pf-mono text-sm text-[#8B93AD] px-7 flex items-center gap-14 whitespace-nowrap">
            {t}
            <span className="w-1 h-1 rounded-full bg-[#7B6CFF]" aria-hidden="true" />
          </span>
        ))}
      </div>
    </div>
  );
}
