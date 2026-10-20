import { useState } from 'react';
import OrbitLogo from './OrbitLogo';
import { NAV } from '../data/nav';
import { useScrolled } from '../hooks/useScrolled';
import { useActiveSection } from '../hooks/useActiveSection';

const NAV_IDS = NAV.map((n) => n.id);

/** Logo pinned top-left, floating glass pill on the right (dropdown on mobile). */
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = useScrolled(24);
  const active = useActiveSection(NAV_IDS, 'about');

  return (
    <nav className={`pf-nav fixed top-0 inset-x-0 z-50 ${scrolled ? 'scrolled' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <OrbitLogo small={scrolled} />

        {/* desktop pill */}
        <div className="pf-pill hidden md:flex items-center gap-1 p-1.5 rounded-full">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className={`pf-navlink ${active === n.id ? 'active' : ''}`}
            >
              {n.icon}
              {n.label}
            </a>
          ))}
        </div>

        {/* mobile toggle */}
        <button
          className="pf-pill md:hidden w-11 h-11 rounded-full grid place-items-center text-gray-200"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {menuOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {/* mobile dropdown */}
      <div className={`md:hidden pf-menu ${menuOpen ? 'open' : ''}`}>
        <div>
          <div className="pf-pill mx-4 mt-2 rounded-3xl p-3 flex flex-col gap-1">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                onClick={() => setMenuOpen(false)}
                className={`pf-navlink ${active === n.id ? 'active' : ''}`}
              >
                {n.icon}
                {n.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
