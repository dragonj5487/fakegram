import React, { useState } from 'react';
import ContourBackground from './components/ContourBackground';
import Hero3D from './components/Hero3D';
import TeamIntroModal from './components/TeamIntroModal';
import MemberCardsModal from './components/MemberCardsModal';
import Project01Modal from './components/Project01Modal';

export default function App() {
  const [activeModal, setActiveModal] = useState(null); // 'about' | 'members' | 'project_01' | null

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black text-neutral-100 font-sans select-none">
      {/* Subtle Contour Wave Background */}
      <ContourBackground />

      {/* Main 3D Hero: Center JCJ with draggable cubes & scatter */}
      <Hero3D />

      {/* 3 Individual Standalone Navigation Buttons (Brackets removed) */}
      <div className="fixed bottom-10 inset-x-0 z-30 flex items-center justify-center gap-4 sm:gap-8 px-4 pointer-events-none">
        <button
          onClick={() => setActiveModal('about')}
          className="pointer-events-auto font-mono text-xs sm:text-sm tracking-wider px-6 py-3 rounded-xl border border-neutral-800 bg-neutral-950/90 text-neutral-300 hover:text-white hover:border-white hover:shadow-[0_0_25px_rgba(255,255,255,0.25)] backdrop-blur-md transition-all duration-200 active:scale-95 cursor-pointer"
        >
          팀소개
        </button>

        <button
          onClick={() => setActiveModal('members')}
          className="pointer-events-auto font-mono text-xs sm:text-sm tracking-wider px-6 py-3 rounded-xl border border-neutral-800 bg-neutral-950/90 text-neutral-300 hover:text-white hover:border-white hover:shadow-[0_0_25px_rgba(255,255,255,0.25)] backdrop-blur-md transition-all duration-200 active:scale-95 cursor-pointer"
        >
          팀원소개
        </button>

        <button
          onClick={() => setActiveModal('project_01')}
          className="pointer-events-auto font-mono text-xs sm:text-sm tracking-wider px-6 py-3 rounded-xl border border-neutral-800 bg-neutral-950/90 text-neutral-300 hover:text-white hover:border-white hover:shadow-[0_0_25px_rgba(255,255,255,0.25)] backdrop-blur-md transition-all duration-200 active:scale-95 cursor-pointer"
        >
          project_01
        </button>
      </div>

      {/* Modal Cards */}
      {activeModal === 'about' && (
        <TeamIntroModal onClose={() => setActiveModal(null)} />
      )}

      {activeModal === 'members' && (
        <MemberCardsModal onClose={() => setActiveModal(null)} />
      )}

      {activeModal === 'project_01' && (
        <Project01Modal onClose={() => setActiveModal(null)} />
      )}
    </div>
  );
}
