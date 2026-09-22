import React from 'react';
import { Compass, Box, Sparkles, Layers, Activity } from 'lucide-react';
import { teamInfo } from '../data/teamData';

export default function TeamIntro() {
  return (
    <section id="about" className="py-28 md:py-36 relative border-t border-neutral-900 bg-black">
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Monospaced HUD Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-neutral-800 bg-neutral-950 text-neutral-400 text-xs font-mono mb-8">
          <Activity className="w-3.5 h-3.5 text-white" />
          <span>TEAM SPECIFICATION // COURSE PROJECT</span>
        </div>

        {/* Section Heading */}
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-8">
          팀 JCJ
        </h2>

        {/* Slogan - Core Statement in Clean High-Contrast Glass HUD */}
        <div className="p-8 md:p-10 rounded-2xl border border-neutral-800 bg-neutral-950/90 shadow-2xl mb-10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-white" />
          <span className="font-mono text-[11px] text-neutral-500 tracking-widest uppercase block mb-3">
            Core Vision & Philosophy
          </span>
          <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-white leading-relaxed">
            "{teamInfo.slogan}"
          </p>
        </div>

        {/* Detailed Explanation */}
        <p className="text-base sm:text-lg text-neutral-400 max-w-3xl leading-relaxed mb-12 font-sans">
          {teamInfo.description}
        </p>

        {/* 3 Core Conceptual Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl border border-neutral-800 bg-neutral-950/70 hover:border-neutral-600 transition-colors">
            <div className="w-10 h-10 rounded-lg border border-neutral-700 bg-neutral-900 flex items-center justify-center text-white mb-5 font-mono text-sm font-bold">
              01
            </div>
            <h3 className="text-lg font-bold text-white mb-2">공간 인터랙션</h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              화면 속에 국한되지 않고 실제 공간의 물리적 맥락과 센싱 요소를 반영하는 새로운 앱/웹을 탐구합니다.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-neutral-800 bg-neutral-950/70 hover:border-neutral-600 transition-colors">
            <div className="w-10 h-10 rounded-lg border border-neutral-700 bg-neutral-900 flex items-center justify-center text-white mb-5 font-mono text-sm font-bold">
              02
            </div>
            <h3 className="text-lg font-bold text-white mb-2">융합적 전공 시너지</h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              디자인 전과생, 제품디자인, 베테랑 학번의 경험이 결합하여 다각도의 창의적 솔루션을 만듭니다.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-neutral-800 bg-neutral-950/70 hover:border-neutral-600 transition-colors">
            <div className="w-10 h-10 rounded-lg border border-neutral-700 bg-neutral-900 flex items-center justify-center text-white mb-5 font-mono text-sm font-bold">
              03
            </div>
            <h3 className="text-lg font-bold text-white mb-2">실험적 프로토타이핑</h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              작은 아이디어에서 출발하여 직접 인터랙티브 코드를 구현하고 지속적으로 검증 및 확장해 나갑니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
