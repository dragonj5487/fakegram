import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ContourBackground from './components/ContourBackground';
import Hero3D from './components/Hero3D';
import TeamIntro from './components/TeamIntro';
import MemberConstellation from './components/MemberConstellation';
import Project01 from './components/Project01';
import Footer from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  // Initially, detailed sections can be revealed when user clicks navigation buttons or explores
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleSelectSection = (sectionId) => {
    setIsUnlocked(true);
    setActiveSection(sectionId);

    // Allow DOM to render revealed sections before scrolling
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        const navOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }, 50);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200 && !isUnlocked) {
        setIsUnlocked(true);
      }

      const sections = ['about', 'members', 'project_01'];
      const scrollPosition = window.scrollY + 250;

      if (window.scrollY < 200) {
        setActiveSection('home');
        return;
      }

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isUnlocked]);

  return (
    <div className="min-h-screen bg-black text-neutral-100 relative font-sans selection:bg-white selection:text-black">
      {/* Subtle Contour Wave Background Canvas */}
      <ContourBackground />

      {/* Futuristic Monochrome Header */}
      <Navbar
        activeSection={activeSection}
        onSelectSection={handleSelectSection}
      />

      {/* Main Content Area */}
      <main className="relative z-10">
        {/* Initial Hero Screen: Pure JCJ + Floating 3D Cubes + 3s Scatter physics */}
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
