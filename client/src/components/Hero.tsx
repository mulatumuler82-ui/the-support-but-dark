import NetworkCanvas from './NetworkCanvas';
import Typewriter from './ui/Typewriter';
import { CV_URL, PROFILE_IMG, ROLES } from '../data/site';

const headlineLine1 = ['Architecting', 'High-Performance', 'Web', 'Apps'];
const headlineLine2 = ['&', 'Distributed', 'Systems'];

export default function Hero() {
  return (
    <header id="about" className="relative">
      <div className="pf-aurora" aria-hidden="true" />
      <NetworkCanvas />

      <div className="relative max-w-6xl mx-auto px-6 pt-32 pb-24 md:pt-40 md:pb-32 grid grid-cols-1 md:grid-cols-12 gap-14 items-center">
        {/* Text */}
        <div className="md:col-span-7 text-center md:text-left">
          <div
            className="pf-rise inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-400/10 text-emerald-300 text-sm font-medium mb-8 border border-emerald-400/20"
            style={{ ['--d' as string]: '0.05s' }}
          >
            <span className="relative flex w-2 h-2">
              <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
              <span className="relative w-2 h-2 rounded-full bg-emerald-400" />
            </span>
            Available for remote contract &amp; freelance projects
          </div>

          <h1 className="pf-display text-[2.6rem] sm:text-6xl lg:text-[4.4rem] font-extrabold leading-[1.02] mb-7 text-white">
            <span className="block">
              {headlineLine1.map((w, i) => (
                <span key={w} className="pf-word">
                  <span style={{ ['--d' as string]: `${0.15 + i * 0.09}s` }}>{w}&nbsp;</span>
                </span>
              ))}
            </span>
            <span className="block pf-gradient-text">
              {headlineLine2.map((w, i) => (
                <span key={w} className="pf-word">
                  <span style={{ ['--d' as string]: `${0.55 + i * 0.09}s` }}>{w}&nbsp;</span>
                </span>
              ))}
            </span>
          </h1>

          <p
            className="pf-rise pf-mono text-sm sm:text-base text-[#4CC9F0] mb-5 h-6"
            style={{ ['--d' as string]: '0.9s' }}
          >
            <span className="text-[#8B93AD]">&gt; </span>
            <Typewriter words={ROLES} />
          </p>

          <p
            className="pf-rise text-[#8B93AD] text-lg max-w-2xl mb-10 leading-relaxed mx-auto md:mx-0"
            style={{ ['--d' as string]: '1s' }}
          >
            Hi, I'm <strong className="text-white">Mulatu</strong> — Full-Stack Software Engineer specialized in
            TypeScript, the MERN stack, Java distributed architectures (RMI/JDBC), and machine learning pipelines. I
            turn complex requirements into production-ready software for global clients.
          </p>

          <div
            className="pf-rise flex flex-wrap justify-center md:justify-start gap-4"
            style={{ ['--d' as string]: '1.1s' }}
          >
            <a href="#projects" className="pf-btn px-7 py-3.5 rounded-full font-semibold text-[#07090F]">
              Explore Case Studies
            </a>
            <a
              href="#contact"
              className="px-7 py-3.5 rounded-full font-medium text-gray-200 border border-[#2a3358] hover:border-[#7B6CFF] hover:bg-[#7B6CFF]/10 transition"
            >
              Let's Build Together
            </a>
            <a
              href={CV_URL}
              download="Mulatu_Jaleta_Abdeta_CV.pdf"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-medium text-gray-200 border border-[#2a3358] hover:border-[#4CC9F0] hover:bg-[#4CC9F0]/10 transition"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 4v11m0 0-4-4m4 4 4-4M5 20h14" />
              </svg>
              Download CV
            </a>
          </div>
        </div>

        {/* Photo – full colour, vivid, with a multi-colour glow and ring */}
        <div className="md:col-span-5 flex justify-center pf-rise" style={{ ['--d' as string]: '0.4s' }}>
          <div className="relative w-64 h-64 md:w-80 md:h-80 pf-float">
            <div className="pf-photo-glow" aria-hidden="true" />
            <div className="pf-ring relative w-full h-full rounded-[2rem]">
              <div className="pf-photo relative w-full h-full rounded-[calc(2rem-3px)] overflow-hidden bg-[#0E1220]">
                <img
                  src={PROFILE_IMG}
                  alt="Mulatu Jaleta Abdeta"
                  className="pf-photo-img w-full h-full object-cover object-center"
                />
                {/* soft colour wash + light sweep */}
                <span className="pf-photo-tint" aria-hidden="true" />
                <span className="pf-photo-shine" aria-hidden="true" />
              </div>
            </div>

            <span className="pf-chip chip-a absolute -left-5 top-10" style={{ animationDelay: '0s' }}>TypeScript</span>
            <span className="pf-chip chip-b absolute -right-5 bottom-20" style={{ animationDelay: '-1.5s' }}>Java RMI</span>
            <span className="pf-chip chip-c absolute left-6 -bottom-4" style={{ animationDelay: '-3s' }}>Scikit-Learn</span>
          </div>
        </div>
      </div>
    </header>
  );
}
