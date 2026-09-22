import React from 'react';
import { ArrowUp } from 'lucide-react';
import { teamInfo } from '../data/teamData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="border-t border-neutral-900 bg-black py-12 relative z-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg font-mono font-bold text-white tracking-widest">
              {teamInfo.name}
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-neutral-800 bg-neutral-950 text-neutral-400">
              COURSE PROJECT
            </span>
          </div>
          <p className="text-xs text-neutral-500 max-w-sm font-sans">
            "{teamInfo.slogan}"
          </p>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-xs font-mono text-neutral-600">
            © {new Date().getFullYear()} Team JCJ. Spatial Interaction.
          </span>
          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-lg border border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-white hover:border-white transition-colors"
            title="맨 위로 가기"
            aria-label="맨 위로 가기"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
