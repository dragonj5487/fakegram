import React, { useState } from 'react';
import { Network, Sparkles, Image as ImageIcon, Music, Clock, Palette, ChevronRight } from 'lucide-react';
import { teamMembers } from '../data/teamData';

const memberConstellationMeta = {
  minhyeok: {
    nodeId: 'NODE_01',
    coord: 'X: 124.8 / Y: -32.1',
    roleLabel: 'DESIGN & SOUND',
    icon: Music,
    initial: '민',
    fileName: 'minhyeok.jpg',
  },
  yongjin: {
    nodeId: 'NODE_02',
    coord: 'X: -88.4 / Y: 140.2',
    roleLabel: 'VETERAN PACER',
    icon: Clock,
    initial: '용',
    fileName: 'yongjin.jpg',
  },
  jihyeok: {
    nodeId: 'NODE_03',
    coord: 'X: 210.0 / Y: 94.6',
    roleLabel: 'PRODUCT & VISUAL',
    icon: Palette,
    initial: '지',
    fileName: 'jihyeok.jpg',
  },
};

export default function MemberConstellation() {
  const [activeMemberId, setActiveMemberId] = useState('minhyeok');
  const [imgErrorMap, setImgErrorMap] = useState({});

  const handleImageError = (id) => {
    setImgErrorMap((prev) => ({ ...prev, [id]: true }));
  };

  const activeMember = teamMembers.find((m) => m.id === activeMemberId) || teamMembers[0];
  const activeMeta = memberConstellationMeta[activeMember.id];
  const ActiveIcon = activeMeta.icon;

  return (
    <section id="members" className="py-28 md:py-36 relative border-t border-neutral-900 bg-black">
      {/* Ambient Coordinates */}
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-neutral-800 bg-neutral-950 text-neutral-400 text-xs font-mono mb-4">
            <Network className="w-3.5 h-3.5 text-white" />
            <span>CONSTELLATION / MEMBER NODES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            팀원 소개
          </h2>
          <p className="text-neutral-400 max-w-xl text-sm sm:text-base font-sans">
            공간 상에 상호 연결된 3개의 노드를 클릭하여 각 팀원의 상세 프로필과 스토리를 확인하세요.
          </p>
        </div>

        {/* Constellation Interactive Canvas / Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left / Constellation Node Selector Map (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-8 rounded-2xl border border-neutral-800 bg-neutral-950/60 backdrop-blur-sm relative overflow-hidden min-h-[420px]">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none" />

            {/* Connecting Constellation Triangle Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <line
                x1="50%"
                y1="22%"
                x2="24%"
                y2="75%"
                stroke="rgba(255,255,255,0.25)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
              <line
                x1="24%"
                y1="75%"
                x2="76%"
                y2="75%"
                stroke="rgba(255,255,255,0.25)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
              <line
                x1="76%"
                y1="75%"
                x2="50%"
                y2="22%"
                stroke="rgba(255,255,255,0.25)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />

              {/* Highlight active lines */}
              {activeMemberId === 'minhyeok' && (
                <>
                  <line x1="50%" y1="22%" x2="24%" y2="75%" stroke="#ffffff" strokeWidth="2" />
                  <line x1="50%" y1="22%" x2="76%" y2="75%" stroke="#ffffff" strokeWidth="2" />
                </>
              )}
              {activeMemberId === 'yongjin' && (
                <>
                  <line x1="24%" y1="75%" x2="50%" y2="22%" stroke="#ffffff" strokeWidth="2" />
                  <line x1="24%" y1="75%" x2="76%" y2="75%" stroke="#ffffff" strokeWidth="2" />
                </>
              )}
              {activeMemberId === 'jihyeok' && (
                <>
                  <line x1="76%" y1="75%" x2="50%" y2="22%" stroke="#ffffff" strokeWidth="2" />
                  <line x1="76%" y1="75%" x2="24%" y2="75%" stroke="#ffffff" strokeWidth="2" />
                </>
              )}
            </svg>

            {/* Node 1: 전민혁 (Top Center) */}
            <div className="absolute top-[18%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <button
                onClick={() => setActiveMemberId('minhyeok')}
                className={`relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                  activeMemberId === 'minhyeok'
                    ? 'bg-white text-black ring-4 ring-white/30 scale-110 shadow-[0_0_25px_rgba(255,255,255,0.8)]'
                    : 'bg-neutral-900 text-neutral-400 border border-neutral-700 hover:border-white hover:text-white'
                }`}
              >
                <span className="font-bold text-sm">민혁</span>
                {activeMemberId === 'minhyeok' && (
                  <span className="absolute -inset-2 rounded-full border border-white/40 animate-ping pointer-events-none" />
                )}
              </button>
              <span className="font-mono text-[11px] text-neutral-400 mt-2 bg-black/80 px-2 py-0.5 rounded border border-neutral-800">
                NODE_01 (22)
              </span>
            </div>

            {/* Node 2: 정용진 (Bottom Left) */}
            <div className="absolute top-[75%] left-[24%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <button
                onClick={() => setActiveMemberId('yongjin')}
                className={`relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                  activeMemberId === 'yongjin'
                    ? 'bg-white text-black ring-4 ring-white/30 scale-110 shadow-[0_0_25px_rgba(255,255,255,0.8)]'
                    : 'bg-neutral-900 text-neutral-400 border border-neutral-700 hover:border-white hover:text-white'
                }`}
              >
                <span className="font-bold text-sm">용진</span>
                {activeMemberId === 'yongjin' && (
                  <span className="absolute -inset-2 rounded-full border border-white/40 animate-ping pointer-events-none" />
                )}
              </button>
              <span className="font-mono text-[11px] text-neutral-400 mt-2 bg-black/80 px-2 py-0.5 rounded border border-neutral-800">
                NODE_02 (21)
              </span>
            </div>

            {/* Node 3: 최지혁 (Bottom Right) */}
            <div className="absolute top-[75%] left-[76%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <button
                onClick={() => setActiveMemberId('jihyeok')}
                className={`relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                  activeMemberId === 'jihyeok'
                    ? 'bg-white text-black ring-4 ring-white/30 scale-110 shadow-[0_0_25px_rgba(255,255,255,0.8)]'
                    : 'bg-neutral-900 text-neutral-400 border border-neutral-700 hover:border-white hover:text-white'
                }`}
              >
                <span className="font-bold text-sm">지혁</span>
                {activeMemberId === 'jihyeok' && (
                  <span className="absolute -inset-2 rounded-full border border-white/40 animate-ping pointer-events-none" />
                )}
              </button>
              <span className="font-mono text-[11px] text-neutral-400 mt-2 bg-black/80 px-2 py-0.5 rounded border border-neutral-800">
                NODE_03 (22)
              </span>
            </div>

            {/* Constellation Center Tag */}
            <div className="absolute bottom-3 text-center">
              <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest">
                [ 3-NODE SPATIAL CONSTELLATION ]
              </span>
            </div>
          </div>

          {/* Right / Focused Member Detailed Card (7 cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-8 md:p-10 shadow-2xl relative">
              {/* Top Meta Bar */}
              <div className="flex items-center justify-between border-b border-neutral-900 pb-5 mb-6">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs px-2.5 py-1 rounded bg-white text-black font-bold">
                    {activeMeta.nodeId}
                  </span>
                  <span className="font-mono text-xs text-neutral-500">
                    {activeMeta.coord}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-neutral-400 text-xs font-mono">
                  <ActiveIcon className="w-3.5 h-3.5 text-white" />
                  <span>{activeMeta.roleLabel}</span>
                </div>
              </div>

              {/* Member Main Section */}
              <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start mb-6">
                {/* Photo / Avatar with Fallback */}
                <div className="relative w-28 h-28 rounded-xl overflow-hidden border border-neutral-700 bg-neutral-900 flex-shrink-0">
                  {!imgErrorMap[activeMember.id] ? (
                    <img
                      src={activeMember.image}
                      alt={activeMember.name}
                      onError={() => handleImageError(activeMember.id)}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-2 text-center bg-neutral-900">
                      <span className="text-2xl font-black text-white mb-1">
                        {activeMeta.initial}
                      </span>
                      <span className="text-[9px] font-mono text-neutral-500 flex items-center gap-1">
                        <ImageIcon className="w-2.5 h-2.5" />
                        사진 대기
                      </span>
                    </div>
                  )}
                </div>

                {/* Name & Academic Year */}
                <div className="text-center sm:text-left flex-grow">
                  <div className="inline-block font-mono text-xs text-neutral-400 border border-neutral-800 px-2 py-0.5 rounded mb-2">
                    {activeMember.studentId}
                  </div>
                  <h3 className="text-3xl font-extrabold text-white mb-1">
                    {activeMember.name}
                  </h3>
                  <p className="text-xs font-mono text-neutral-500">
                    public/images/{activeMeta.fileName}
                  </p>
                </div>
              </div>

              {/* Story Box */}
              <div className="p-5 rounded-xl border border-neutral-800/90 bg-neutral-900/60 mb-6">
                <p className="text-base text-neutral-200 leading-relaxed break-keep">
                  {activeMember.summary}
                </p>
              </div>

              {/* Tags & Quick Switch Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-neutral-900">
                <div className="flex flex-wrap gap-1.5">
                  {activeMember.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs font-mono text-neutral-400 bg-neutral-900 px-2.5 py-1 rounded border border-neutral-800"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Switcher */}
                <div className="flex items-center gap-1 text-xs font-mono text-neutral-400">
                  <span>다음 노드:</span>
                  {teamMembers.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setActiveMemberId(m.id)}
                      className={`px-2 py-1 rounded border transition-colors ${
                        m.id === activeMemberId
                          ? 'border-white text-white bg-neutral-800'
                          : 'border-neutral-800 text-neutral-500 hover:text-white'
                      }`}
                    >
                      {m.name[0]}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
