import React from 'react';
import { Compass, Box, Sparkles, ArrowDown, Layers, Radio } from 'lucide-react';
import { teamInfo } from '../data/teamData';

export default function TeamIntro() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="about" className="relative pt-36 pb-24 md:pt-44 md:pb-32 overflow-hidden">
      {/* Background Glows & Spatial Grid */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-jade-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-teal-600/10 rounded-full blur-[100px] pointer-events-none" />
      
      {/* Subtle Spatial Coordinate Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#14b8a608_1px,transparent_1px),linear-gradient(to_bottom,#14b8a608_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-jade-500/10 border border-jade-500/30 text-jade-300 text-xs font-semibold uppercase tracking-wider mb-6">
          <Radio className="w-3.5 h-3.5 text-jade-400 animate-pulse" />
          <span>University Project • Team JCJ</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.15] mb-6">
          팀 <span className="text-transparent bg-clip-text bg-gradient-to-r from-jade-400 via-teal-300 to-emerald-400">JCJ</span>
        </h1>

        {/* Slogan - Core requested sentence */}
        <div className="p-6 md:p-8 rounded-2xl bg-slate-900/80 border border-jade-500/30 backdrop-blur-md shadow-[0_0_30px_rgba(20,184,166,0.12)] mb-8">
          <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-slate-100 leading-relaxed">
            "{teamInfo.slogan}"
          </p>
        </div>

        {/* Description & Mission */}
        <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed mb-10">
          {teamInfo.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2.5 mb-12">
          {teamInfo.tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-3.5 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60 text-slate-300 text-xs font-medium hover:border-jade-500/40 hover:text-jade-300 transition-colors"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Spatial Interaction Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-4">
          <div className="p-5 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-jade-500/40 transition-all group">
            <div className="w-10 h-10 rounded-lg bg-jade-500/10 border border-jade-500/20 flex items-center justify-center text-jade-400 mb-4 group-hover:scale-105 transition-transform">
              <Box className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-white mb-2 group-hover:text-jade-300 transition-colors">
              공간과 기술의 융합
            </h3>
            <p className="text-sm text-slate-400 leading-normal">
              화면 속에만 갇혀있는 정적인 정보를 넘어, 실제 환경 및 맥락과 맞닿은 인터랙션을 탐구합니다.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-jade-500/40 transition-all group">
            <div className="w-10 h-10 rounded-lg bg-jade-500/10 border border-jade-500/20 flex items-center justify-center text-jade-400 mb-4 group-hover:scale-105 transition-transform">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-white mb-2 group-hover:text-jade-300 transition-colors">
              융합형 팀 시너지
            </h3>
            <p className="text-sm text-slate-400 leading-normal">
              디자인 전과생, 제품디자인, 베테랑 학번이 모여 개성과 통찰이 어우러진 창의적인 프로젝트를 만듭니다.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-jade-500/40 transition-all group">
            <div className="w-10 h-10 rounded-lg bg-jade-500/10 border border-jade-500/20 flex items-center justify-center text-jade-400 mb-4 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-white mb-2 group-hover:text-jade-300 transition-colors">
              직접 만드는 첫걸음
            </h3>
            <p className="text-sm text-slate-400 leading-normal">
              웹 개발과 인터랙티브 기술을 손수 구현하며 작은 프로토타입에서부터 점진적으로 발전해 나갑니다.
            </p>
          </div>
        </div>

        {/* Quick jump CTA */}
        <div className="mt-14 flex items-center gap-4">
          <button
            onClick={() => scrollToSection('members')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-jade-500 hover:bg-jade-400 text-slate-950 font-bold text-sm tracking-wide shadow-[0_0_20px_rgba(20,184,166,0.4)] hover:shadow-[0_0_25px_rgba(45,212,191,0.6)] transition-all"
          >
            팀원 소개 보기
            <ArrowDown className="w-4 h-4" />
          </button>
          <button
            onClick={() => scrollToSection('project_01')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-jade-500/40 font-semibold text-sm transition-all"
          >
            project_01 바로가기
          </button>
        </div>
      </div>
    </section>
  );
}
