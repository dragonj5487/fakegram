import React from 'react';
import { ArrowUp } from 'lucide-react';
import { teamInfo } from '../data/teamData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="border-t border-slate-800/80 bg-[#080B12] py-12">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl font-bold text-white tracking-wider">
              {teamInfo.name}
            </span>
            <span className="text-xs px-2 py-0.5 rounded bg-jade-500/15 text-jade-300 border border-jade-500/30">
              Team Project
            </span>
          </div>
          <p className="text-xs text-slate-400 max-w-sm">
            "{teamInfo.slogan}"
          </p>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-xs text-slate-400">
            © {new Date().getFullYear()} Team JCJ. All rights reserved.
          </span>
          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-jade-300 hover:border-jade-500/40 transition-colors"
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
