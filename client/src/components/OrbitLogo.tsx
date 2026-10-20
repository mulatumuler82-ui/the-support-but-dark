import { PROFILE_IMG } from '../data/site';

/**
 * Top-left logo: the name written around a circle that keeps rotating,
 * with a dim pulsing glow behind it and my photo in the middle.
 * Hover pauses the rotation so the name can be read comfortably.
 */
export default function OrbitLogo({ small }: { small: boolean }) {
  const label = 'MULATU JALETA ABDETA  ✦  FULL-STACK ENGINEER  ✦  ';
  return (
    <a
      href="#about"
      aria-label="Mulatu Jaleta Abdeta – back to top"
      className={`pf-logo ${small ? 'small' : ''}`}
    >
      <span className="pf-logo-glow" aria-hidden="true" />
      <span className="pf-logo-ring" aria-hidden="true" />

      <svg className="pf-logo-text" viewBox="0 0 100 100" aria-hidden="true">
        <defs>
          <linearGradient id="pf-text-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffb3d9" />
            <stop offset="50%" stopColor="#b8b0ff" />
            <stop offset="100%" stopColor="#7be3ff" />
          </linearGradient>
          <path id="pf-circle" d="M 50,50 m -39,0 a 39,39 0 1,1 78,0 a 39,39 0 1,1 -78,0" />
        </defs>
        <text fill="url(#pf-text-grad)" fontSize="8.6" fontWeight="700" letterSpacing="0.6">
          <textPath href="#pf-circle" textLength="243" lengthAdjust="spacing">
            {label}
          </textPath>
        </text>
      </svg>

      <span className="pf-logo-photo" aria-hidden="true">
        <img src={PROFILE_IMG} alt="" draggable={false} />
      </span>
    </a>
  );
}
