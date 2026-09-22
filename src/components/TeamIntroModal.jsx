import React from 'react';
import { X, Activity, Box, Layers, Sparkles } from 'lucide-react';
import { teamInfo } from '../data/teamData';

export default function TeamIntroModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-300 select-none">
      <div className="relative w-full max-w-4xl rounded-3xl border border-neutral-800 bg-neutral-950/95 p-6 sm:p-10 shadow-[0_0_80px_rgba(255,255,255,0.08)] flex flex-col max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-5 mb-8">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-neutral-400 mb-1">
              <Activity className="w-3.5 h-3.5 text-white" />
              <span>TEAM SPECIFICATION // VISION</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              팀 소개
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-full border border-neutral-700 bg-neutral-900 text-neutral-400 hover:text-white hover:border-white transition-all"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Slogan Card */}
        <div className="p-7 sm:p-8 rounded-2xl border border-neutral-800 bg-neutral-900/60 shadow-xl mb-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-white" />
          <span className="font-mono text-[11px] text-neutral-500 tracking-widest uppercase block mb-3">
            Core Slogan
          </span>
          <p className="text-xl sm:text-2xl font-bold text-white leading-relaxed">
            "{teamInfo.slogan}"
          </p>
        </div>

        {/* Description */}
        <p className="text-base text-neutral-300 leading-relaxed mb-8 font-sans">
          {teamInfo.description}
        </p>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
          <div className="p-5 rounded-xl border border-neutral-800/90 bg-neutral-900/40">
            <div className="font-mono text-xs text-neutral-500 font-bold mb-2">01 // SPATIAL</div>
            <h4 className="text-base font-bold text-white mb-1.5">공간 인터랙션</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              화면 속에 갇히지 않고 물리적 공간 맥락을 융합하는 실시간 상호작용.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-neutral-800/90 bg-neutral-900/40">
            <div className="font-mono text-xs text-neutral-500 font-bold mb-2">02 // SYNERGY</div>
            <h4 className="text-base font-bold text-white mb-1.5">융합형 시너지</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              디자인 전과, 제품디자인, 베테랑 학번의 경험이 만드는 독창적 통찰.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-neutral-800/90 bg-neutral-900/40">
            <div className="font-mono text-xs text-neutral-500 font-bold mb-2">03 // PROTO</div>
            <h4 className="text-base font-bold text-white mb-1.5">실험적 구현</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              웹과 3D 기술을 직접 코딩하고 프로토타이핑하며 단계별 확장.
            </p>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 pt-4 border-t border-neutral-900">
          {teamInfo.tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-3 py-1 rounded bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-400"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
