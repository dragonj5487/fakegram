import React from 'react';
import { Sparkles, Construction, Layers, Cpu, ArrowUpRight } from 'lucide-react';
import { project01 } from '../data/teamData';

export default function Project01() {
  return (
    <section id="project_01" className="py-24 md:py-32 relative">
      {/* Background accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Section Title */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-jade-500/10 border border-jade-500/30 text-jade-300 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-jade-400" />
            <span>Upcoming Project</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            project_01
          </h2>
          <p className="text-slate-400 max-w-lg text-base">
            JCJ 팀이 준비 중인 첫 번째 공간 상호작용 인터랙티브 프로젝트입니다.
          </p>
        </div>

        {/* Placeholder Showcase Card */}
        <div className="relative rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-[#0A0E17] border border-jade-500/30 p-8 md:p-12 overflow-hidden shadow-[0_0_50px_rgba(20,184,166,0.1)]">
          {/* Subtle Corner Decoration */}
          <div className="absolute -top-16 -right-16 w-48 h-48 bg-jade-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="flex flex-col md:flex-row gap-8 items-start justify-between relative z-10">
            {/* Left Content */}
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-medium mb-4">
                <Construction className="w-3.5 h-3.5" />
                <span>{project01.statusLabel}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-snug">
                {project01.subtitle}
              </h3>

              <p className="text-slate-300 text-base leading-relaxed mb-6">
                {project01.description}
              </p>

              {/* Planned Feature Points */}
              <div className="space-y-3 mb-6">
                <h4 className="text-xs uppercase tracking-wider text-jade-400 font-bold">
                  핵심 기획 포인트
                </h4>
                <div className="grid grid-cols-1 gap-2.5">
                  {project01.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-sm text-slate-300"
                    >
                      <div className="w-2 h-2 rounded-full bg-jade-400" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Visual Interactive Blueprint Placeholder */}
            <div className="w-full md:w-80 flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-950/90 border border-slate-800/80 text-center relative overflow-hidden group">
              <div className="w-20 h-20 rounded-2xl bg-jade-500/10 border border-jade-500/30 flex items-center justify-center text-jade-400 mb-4 group-hover:scale-110 transition-transform">
                <Cpu className="w-10 h-10 animate-pulse" />
              </div>

              <span className="text-xs font-mono uppercase tracking-widest text-jade-400 mb-1">
                Prototype Stage
              </span>
              <h4 className="text-lg font-bold text-white mb-2">
                Spatial Interaction Lab
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                강의 진행 및 프로토타입 완성과 함께 실제 데모 및 결과물이 여기에 업데이트됩니다.
              </p>

              <div className="mt-5 w-full pt-4 border-t border-slate-800/80 flex items-center justify-center gap-1.5 text-xs text-slate-400">
                <Layers className="w-3.5 h-3.5 text-jade-400" />
                <span>개발 진행 중 (0%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
