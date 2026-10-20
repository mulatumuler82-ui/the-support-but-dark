import Reveal from './ui/Reveal';
import TiltCard from './ui/TiltCard';
import { GithubIcon, ArrowUpRightIcon } from './ui/icons';
import type { Project } from '../data/projects';

type Props = { project: Project; index: number };

export default function CaseStudyCard({ project: p, index }: Props) {
  const handleGitHubClick = () => {
    if (window.confirm('Do you want to see in GitHub?')) window.open(p.repo, '_blank');
  };

  return (
    <Reveal delay={(index % 2) * 0.12} className="h-full">
      <TiltCard>
        <div className="p-7 flex-1 flex flex-col">
          <p className="text-sm text-[#7B6CFF] font-medium mb-2">{p.category}</p>
          <h3 className="pf-display text-2xl font-bold text-white mb-5">{p.title}</h3>

          {p.problem ? (
            <dl className="space-y-4 text-sm text-[#B4BBD3] mb-7 border-l border-[#2a3358] pl-5">
              <div>
                <dt className="text-white font-semibold mb-0.5">The problem</dt>
                <dd className="leading-relaxed">{p.problem}</dd>
              </div>
              <div>
                <dt className="text-white font-semibold mb-0.5">The solution</dt>
                <dd className="leading-relaxed">{p.solution}</dd>
              </div>
              <div>
                <dt className="text-white font-semibold mb-0.5">Impact</dt>
                <dd className="leading-relaxed">{p.impact}</dd>
              </div>
            </dl>
          ) : (
            <p className="text-[#B4BBD3] text-sm leading-relaxed mb-7">{p.blurb}</p>
          )}

          <div className="flex flex-wrap gap-2 mt-auto mb-6">
            {p.tags.map((t) => (
              <span
                key={t}
                className="pf-mono text-xs text-[#9fb0ff] bg-[#7B6CFF]/10 border border-[#7B6CFF]/20 px-2.5 py-1 rounded-md"
              >
                {t}
              </span>
            ))}
          </div>

          <button
            onClick={handleGitHubClick}
            className="pf-gh group inline-flex items-center justify-center gap-2.5 text-sm font-medium text-white border border-[#2a3358] hover:border-[#7B6CFF] py-3 px-4 rounded-xl transition"
          >
            <GithubIcon />
            View on GitHub
            <ArrowUpRightIcon />
          </button>
        </div>
      </TiltCard>
    </Reveal>
  );
}
