import React, { useState, useEffect } from 'react';
import ContourBackground from './components/ContourBackground';
import Hero3D from './components/Hero3D';
import TeamIntro from './components/TeamIntro';
import MemberConstellation from './components/MemberConstellation';
import Project01 from './components/Project01';
import Footer from './components/Footer';

export default function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleSelectSection = (sectionId) => {
    setIsUnlocked(true);

    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150 && !isUnlocked) {
        setIsUnlocked(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isUnlocked]);

  return (
    <div className="min-h-screen bg-black text-neutral-100 relative font-sans selection:bg-white selection:text-black">
      {/* Subtle Contour Wave Background Canvas */}
      <ContourBackground />

      {/* Main Content Area (No top bar) */}
      <main className="relative z-10">
        {/* Initial Hero Screen: Pure JCJ + Floating 3D Cubes */}
        <Hero3D onExploreSection={handleSelectSection} />

        {/* Content sections revealed upon interaction or scrolling */}
        <div
          className={`transition-opacity duration-700 ${
            isUnlocked ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          {/* Section 1: Team Intro */}
          <TeamIntro />

          {/* Section 2: Constellation Member Nodes */}
          <MemberConstellation />

          {/* Section 3: Project 01 Blueprint */}
          <Project01 />
        </div>
      </main>

      {/* Footer */}
      {isUnlocked && <Footer />}
    </div>
  );
}
