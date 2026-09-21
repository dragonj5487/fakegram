import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import TeamIntro from './components/TeamIntro';
import TeamMembers from './components/TeamMembers';
import Project01 from './components/Project01';
import Footer from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'members', 'project_01'];
      const scrollPosition = window.scrollY + 200;

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
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0E17] text-slate-100 flex flex-col selection:bg-jade-500/30 selection:text-jade-300">
      <Navbar activeSection={activeSection} />
      <main className="flex-grow">
        <TeamIntro />
        <TeamMembers />
        <Project01 />
      </main>
      <Footer />
    </div>
  );
}
