import Reveal from './ui/Reveal';
import CaseStudyCard from './CaseStudyCard';
import { PROJECTS } from '../data/projects';

export default function Projects() {
  return (
    <section id="projects" className="max-w-6xl mx-auto px-6 py-24 md:py-32">
      <Reveal>
        <div className="mb-14 max-w-2xl">
          <h2 className="pf-display text-4xl md:text-5xl font-bold text-white mb-4">Engineering case studies</h2>
          <p className="text-[#8B93AD] text-lg">
            Real-world systems engineered with robust architecture, clean code, and scalable logic.
          </p>
        </div>
      </Reveal>

      <div className="grid md:grid-cols-2 gap-6">
        {PROJECTS.map((p, i) => (
          <CaseStudyCard key={p.title} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
