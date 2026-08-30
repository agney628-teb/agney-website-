'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Sun, Moon, Mail, Activity, Menu, X } from 'lucide-react';

interface NavigationProps {
  darkMode: boolean;
  setDarkMode: (val: boolean | ((prev: boolean) => boolean)) => void;
  onCursorChange: (mode: 'default' | 'view' | 'explore' | 'play' | 'open', text?: string) => void;
}

export default function Navigation({ darkMode, setDarkMode, onCursorChange }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundPlaying, setSoundPlaying] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 py-5 px-6 md:px-14 flex items-center justify-between pointer-events-none transition-all duration-300">
        {/* Left: Location Pin */}
        <div className={`pointer-events-auto flex items-center gap-2 font-mono text-xs md:text-sm tracking-wider uppercase font-medium drop-shadow-sm transition-colors ${scrolled ? 'text-neutral-900 dark:text-white' : 'text-white'}`}>
          <MapPin size={15} className="text-[#ffda3f]" />
          <span>MALAPPURAM, KERALA</span>
        </div>

        {/* Center Floating Glass Pill (Transforms to Compact Pill on Scroll) */}
        <nav className="pointer-events-auto hidden md:flex items-center">
          <motion.div
            layout
            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            className={`flex items-center gap-4 px-3.5 py-1.5 rounded-full backdrop-blur-xl border shadow-lg transition-colors ${
              scrolled
                ? 'bg-[#fff9f1]/85 dark:bg-[#061125]/85 border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white'
                : 'bg-white/25 dark:bg-white/10 border-white/40 dark:border-white/20 text-white'
            }`}
          >
            {/* Avatar Circle using Agney's Real Photo */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onMouseEnter={() => onCursorChange('open', 'TOP')}
              onMouseLeave={() => onCursorChange('default')}
              className="w-8 h-8 rounded-full overflow-hidden border border-white/60 block hover:scale-105 transition-transform flex-shrink-0"
            >
              <img
                src="/agney-avatar.jpg"
                alt="Agney Avatar"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80';
                }}
              />
            </a>

            {/* When Scrolled: Show "Available for work 🟡" (Exact as in Video) */}
            {scrolled ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2 text-xs font-mono font-medium pr-2 text-neutral-900 dark:text-white"
              >
                <span>Available for work</span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffda3f] shadow-[0_0_8px_#ffda3f] animate-pulse" />
              </motion.div>
            ) : (
              /* Full Nav Links When At Top */
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-4 text-xs font-mono tracking-tight text-white"
              >
                <a
                  href="#work"
                  onClick={(e) => scrollToSection(e, '#work')}
                  onMouseEnter={() => onCursorChange('open', 'WORK')}
                  onMouseLeave={() => onCursorChange('default')}
                  className="px-3 py-1 rounded-full hover:bg-white/20 transition-colors"
                >
                  Work
                </a>

                <a
                  href="#about"
                  onClick={(e) => scrollToSection(e, '#about')}
                  onMouseEnter={() => onCursorChange('open', 'ABOUT')}
                  onMouseLeave={() => onCursorChange('default')}
                  className="px-3 py-1 rounded-full hover:bg-white/20 transition-colors"
                >
                  About
                </a>

                <a
                  href="#play"
                  onClick={(e) => scrollToSection(e, '#play')}
                  onMouseEnter={() => onCursorChange('open', 'PLAY')}
                  onMouseLeave={() => onCursorChange('default')}
                  className="px-3 py-1 rounded-full hover:bg-white/20 transition-colors"
                >
                  Playground
                </a>

                {/* White CTA: "✉ Work with me" */}
                <a
                  href="#contact"
                  onClick={(e) => scrollToSection(e, '#contact')}
                  onMouseEnter={() => onCursorChange('open', 'HIRE')}
                  onMouseLeave={() => onCursorChange('default')}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white text-black font-sans text-xs font-bold shadow-md hover:bg-neutral-100 transition-colors"
                >
                  <Mail size={13} />
                  <span>Work with me</span>
                </a>
              </motion.div>
            )}
          </motion.div>
        </nav>

        {/* Right: Sound Wave & Theme Switcher */}
        <div className="pointer-events-auto flex items-center gap-3">
          {/* Sound Wave Indicator */}
          <button
            onClick={() => setSoundPlaying(!soundPlaying)}
            className={`w-9 h-9 rounded-full backdrop-blur-md border flex items-center justify-center shadow-sm hover:scale-105 transition-transform ${
              scrolled
                ? 'bg-[#fff9f1]/80 dark:bg-[#061125]/80 border-neutral-300 dark:border-white/20 text-neutral-900 dark:text-white'
                : 'bg-white/20 dark:bg-white/10 border-white/30 text-white'
            }`}
            aria-label="Sound status"
          >
            <Activity size={16} className={soundPlaying ? 'text-[#ffda3f] animate-pulse' : 'opacity-80'} />
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={() => setDarkMode((prev) => !prev)}
            onMouseEnter={() => onCursorChange('open', darkMode ? 'DAY' : 'NIGHT')}
            onMouseLeave={() => onCursorChange('default')}
            aria-label="Toggle Theme"
            className={`w-9 h-9 rounded-full backdrop-blur-md border flex items-center justify-center shadow-sm hover:scale-105 transition-transform ${
              scrolled
                ? 'bg-[#fff9f1]/80 dark:bg-[#061125]/80 border-neutral-300 dark:border-white/20 text-neutral-900 dark:text-white'
                : 'bg-white/20 dark:bg-white/10 border-white/30 text-white'
            }`}
          >
            {darkMode ? <Moon size={16} className="text-[#ffda3f]" /> : <Sun size={16} className="text-[#ffda3f]" />}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded-full backdrop-blur-md border ${
              scrolled
                ? 'bg-[#fff9f1]/80 dark:bg-[#061125]/80 border-neutral-300 text-neutral-900 dark:text-white'
                : 'bg-white/20 border-white/30 text-white'
            }`}
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-neutral-900/95 backdrop-blur-xl p-8 pt-28 md:hidden flex flex-col justify-between"
          >
            <nav className="flex flex-col gap-6">
              {['Work', 'About', 'Playground', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={(e) => scrollToSection(e, `#${item.toLowerCase()}`)}
                  className="text-3xl font-bold tracking-tight text-white border-b border-white/10 pb-4"
                >
                  {item}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
