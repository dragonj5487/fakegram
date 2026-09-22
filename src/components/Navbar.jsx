import React, { useState, useEffect } from 'react';
import { Compass, Users, Terminal, Menu, X, Sparkles } from 'lucide-react';

export default function Navbar({ activeSection, onSelectSection }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'about', label: '팀소개', icon: Compass },
    { id: 'members', label: '팀원소개', icon: Users },
    { id: 'project_01', label: 'project_01', icon: Terminal },
  ];

  const handleNavClick = (id) => {
    setMobileMenuOpen(false);
    onSelectSection(id);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/90 backdrop-blur-md border-b border-neutral-800 shadow-2xl'
          : 'bg-transparent border-b border-neutral-900/40'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-3 group text-left focus:outline-none"
        >
          <div className="w-9 h-9 rounded-lg border border-neutral-700 bg-neutral-900/80 flex items-center justify-center text-white font-mono font-black text-lg group-hover:border-white transition-colors">
            J
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-base tracking-widest text-white font-mono group-hover:text-neutral-300 transition-colors">
              JCJ
            </span>
            <span className="text-[10px] font-mono text-neutral-500 tracking-wider">
              SPATIAL INTERACTION
            </span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2 p-1 rounded-full border border-neutral-800 bg-neutral-950/80 backdrop-blur-md">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-mono tracking-wider transition-all duration-200 ${
                  isActive
                    ? 'bg-white text-black font-bold shadow-[0_0_15px_rgba(255,255,255,0.4)]'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-black' : 'text-neutral-500'}`} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2.5 rounded-lg border border-neutral-800 bg-neutral-900 text-neutral-300 hover:text-white hover:border-neutral-500 transition-colors"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-neutral-950 border-b border-neutral-800 px-6 py-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-mono transition-all ${
                  isActive
                    ? 'bg-white text-black font-bold'
                    : 'text-neutral-300 hover:bg-neutral-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
