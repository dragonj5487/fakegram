import React from 'react';
import { Sparkles, Terminal, Layers, Cpu, ArrowUpRight } from 'lucide-react';
import { project01 } from '../data/teamData';

export default function Project01() {
  return (
    <section id="project_01" className="py-28 md:py-36 relative border-t border-neutral-900 bg-black">
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-neutral-800 bg-neutral-950 text-neutral-400 text-xs font-mono mb-4">
            <Terminal className="w-3.5 h-3.5 text-white" />
            <span>INCUBATION // LAB ARCHIVE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            project_01
          </h2>
          <p className="text-neutral-400 max-w-lg text-sm sm:text-base font-sans">
            JCJ 팀의 첫 번째 공간 상호작용 인터랙티브 실험 프로젝트입니다.
          </p>
        </div>

        {/* Technical Blueprint Card */}
        <div className="rounded-3xl border border-neutral-800 bg-neutral-950/80 p-8 md:p-12 relative overflow-hidden shadow-2xl">
          {/* Blueprint Grid Lines */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] pointer-events-none" />

          <div className="flex flex-col lg:flex-row gap-10 items-start justify-between relative z-10">
            {/* Left Content */}
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-neutral-900 border border-neutral-700 text-neutral-300 text-xs font-mono mb-5">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <span>STATUS: {project01.statusLabel}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4 leading-snug">
                {project01.subtitle}
              </h3>

              <p className="text-neutral-400 text-base leading-relaxed mb-8 font-sans">
                {project01.description}
              </p>

              {/* Planned Feature Points */}
              <div className="space-y-3">
                <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 block">
                  KEY OBJECTIVES
                </span>
                <div className="grid grid-cols-1 gap-2.5">
                  {project01.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800 text-sm text-neutral-300 font-mono"
                    >
                      <span className="text-white font-bold text-xs">[0{idx + 1}]</span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Interactive Prototype Placeholder Box */}
            <div className="w-full lg:w-80 flex flex-col items-center justify-center p-8 rounded-2xl border border-neutral-800 bg-neutral-900/40 text-center relative">
              <div className="w-20 h-20 rounded-2xl border border-neutral-700 bg-black flex items-center justify-center text-white mb-6 shadow-xl">
                <Cpu className="w-10 h-10 animate-pulse text-white" />
              </div>

              <span className="font-mono text-[11px] uppercase tracking-widest text-neutral-500 mb-1">
                SYSTEM PIPELINE
              </span>
              <h4 className="text-lg font-bold text-white mb-2">
                Spatial Prototype
              </h4>
              <p className="text-xs text-neutral-400 leading-relaxed font-sans mb-6">
                강의 프로젝트 진행에 맞추어 실제 데모 애플리케이션 및 인터랙티브 결과물이 연결될 예정입니다.
              </p>

              <div className="w-full pt-4 border-t border-neutral-800 flex items-center justify-between text-xs font-mono text-neutral-500">
                <span>STAGE: DEV_0.1</span>
                <span className="text-white">STANDBY</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
