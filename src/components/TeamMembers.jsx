import React, { useState } from 'react';
import { Users, Music, Clock, Palette, Sparkles, Image as ImageIcon, CheckCircle2 } from 'lucide-react';
import { teamMembers } from '../data/teamData';

// Custom icons based on each member's personality/story
const memberMeta = {
  minhyeok: {
    badge: '음악 & 디자인',
    icon: Music,
    initial: '민',
    accentGrad: 'from-teal-500 to-emerald-400',
    fileName: 'minhyeok.jpg',
  },
  yongjin: {
    badge: '대학교 장기 재학생',
    icon: Clock,
    initial: '용',
    accentGrad: 'from-jade-400 to-cyan-500',
    fileName: 'yongjin.jpg',
  },
  jihyeok: {
    badge: '제품 → 시각디자인',
    icon: Palette,
    initial: '지',
    accentGrad: 'from-emerald-400 to-teal-300',
    fileName: 'jihyeok.jpg',
  },
};

export default function TeamMembers() {
  const [imgErrorMap, setImgErrorMap] = useState({});

  const handleImageError = (id) => {
    setImgErrorMap((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section id="members" className="py-24 md:py-32 relative bg-slate-950/60 border-t border-slate-900">
      {/* Background soft ambient glow */}
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-jade-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-jade-500/10 border border-jade-500/30 text-jade-300 text-xs font-semibold mb-4">
            <Users className="w-3.5 h-3.5 text-jade-400" />
            <span>Team Members</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            팀원 소개
          </h2>
          <p className="text-slate-400 max-w-xl text-base sm:text-lg">
            서로 다른 배경과 개성을 가진 3명의 팀원이 모여 새로운 상호작용을 만들어 갑니다.
          </p>
        </div>

        {/* Member Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member) => {
            const meta = memberMeta[member.id] || {};
            const IconComponent = meta.icon || Sparkles;
            const hasError = imgErrorMap[member.id];

            return (
              <div
                key={member.id}
                className="group relative rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-900/50 border border-slate-800 hover:border-jade-500/50 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_15px_30px_-10px_rgba(20,184,166,0.25)] flex flex-col justify-between"
              >
                {/* Top Member Card Content */}
                <div>
                  {/* Avatar / Photo Container */}
                  <div className="relative mb-6 flex justify-center">
                    <div className="relative w-32 h-32 rounded-2xl overflow-hidden p-1 bg-gradient-to-tr from-jade-500/40 via-slate-800 to-teal-400/30 group-hover:from-jade-400 group-hover:to-teal-300 transition-all duration-300 shadow-inner">
                      <div className="w-full h-full rounded-[14px] overflow-hidden bg-slate-900 flex items-center justify-center relative">
                        {/* If image is available and not errored */}
                        {!hasError ? (
                          <img
                            src={member.image}
                            alt={`${member.name} 프로필`}
                            onError={() => handleImageError(member.id)}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : null}

                        {/* Fallback stylized avatar when no image */}
                        {hasError && (
                          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 to-slate-950 p-3 text-center">
                            <div className="w-12 h-12 rounded-full bg-jade-500/15 border border-jade-500/30 flex items-center justify-center text-jade-300 font-bold text-lg mb-1">
                              {meta.initial}
                            </div>
                            <span className="text-[10px] text-slate-400 flex items-center gap-1">
                              <ImageIcon className="w-3 h-3 text-jade-400/70" />
                              사진 대기 중
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Member Specialty Badge Icon */}
                    <div className="absolute -bottom-2 right-1/2 translate-x-12 p-2 rounded-xl bg-slate-900 border border-jade-500/40 shadow-lg text-jade-400 group-hover:scale-110 transition-transform">
                      <IconComponent className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Name and Student Year */}
                  <div className="text-center mb-4">
                    <div className="inline-block px-2.5 py-0.5 rounded-md bg-jade-950/70 border border-jade-500/30 text-jade-400 text-xs font-semibold mb-2">
                      {member.studentId}
                    </div>
                    <h3 className="text-2xl font-bold text-white group-hover:text-jade-300 transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-xs text-jade-400/90 font-medium mt-0.5">
                      {meta.badge}
                    </p>
                  </div>

                  {/* Story / Description */}
                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 mb-5">
                    <p className="text-sm text-slate-300 leading-relaxed break-keep">
                      {member.summary}
                    </p>
                  </div>
                </div>

                {/* Bottom Tags and Photo Placement Guide Hint */}
                <div>
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800/70 mb-3">
                    {member.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded bg-slate-800/60 text-[11px] text-slate-400 font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Helper hint for user photo addition */}
                  <div className="text-[11px] text-slate-400 flex items-center justify-between px-1 pt-1">
                    <span className="font-mono text-slate-400">
                      public/images/{meta.fileName}
                    </span>
                    <span className="text-jade-400/80 text-[10px]">
                      {hasError ? '사진 추가 가능' : '사진 적용됨'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
