'use client';

import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import CustomCursor, { CursorMode } from '@/components/CustomCursor';
import Hero from '@/components/Hero';
import Manifesto from '@/components/Manifesto';
import SelectedWork from '@/components/SelectedWork';
import TebInnovationsSection from '@/components/TebInnovationsSection';
import AchievementsArchive from '@/components/AchievementsArchive';
import AboutSection from '@/components/AboutSection';
import SkillExplorer from '@/components/SkillExplorer';
import ExperienceTimeline from '@/components/ExperienceTimeline';
import Playground from '@/components/Playground';
import MotionReel from '@/components/MotionReel';
import TestimonialsDeck from '@/components/TestimonialsDeck';
import NotesSection from '@/components/NotesSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export default function Home() {
  const [darkMode, setDarkMode] = useState(true);
  const [cursorMode, setCursorMode] = useState<CursorMode>('default');
  const [cursorText, setCursorText] = useState<string | undefined>(undefined);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  const handleCursorChange = (mode: CursorMode, text?: string) => {
    setCursorMode(mode);
    setCursorText(text);
  };

  return (
    <main className="min-h-screen relative overflow-hidden selection:bg-accent selection:text-white">
      {/* Custom Spring Cursor */}
      <CustomCursor cursorMode={cursorMode} cursorText={cursorText} />

      {/* Header Navigation */}
      <Navigation
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onCursorChange={handleCursorChange}
      />

      {/* 3D Spatial Interactive Hero */}
      <Hero onCursorChange={handleCursorChange} />

      {/* Philosophy Manifesto */}
      <Manifesto onCursorChange={handleCursorChange} />

      {/* Selected Work & Publications */}
      <SelectedWork onCursorChange={handleCursorChange} />

      {/* TEB Innovations Chapter */}
      <TebInnovationsSection onCursorChange={handleCursorChange} />

      {/* Awards & Milestones Archive */}
      <AchievementsArchive onCursorChange={handleCursorChange} />

      {/* About Agney Story */}
      <AboutSection onCursorChange={handleCursorChange} />

      {/* Capabilities 4-Column Grid */}
      <SkillExplorer onCursorChange={handleCursorChange} />

      {/* Career Timeline */}
      <ExperienceTimeline onCursorChange={handleCursorChange} />

      {/* HTML5 Particle Physics Sandbox */}
      <Playground onCursorChange={handleCursorChange} />

      {/* Motion Video Showreel Player */}
      <MotionReel onCursorChange={handleCursorChange} />

      {/* Glass Fan-Out Testimonials Deck */}
      <TestimonialsDeck onCursorChange={handleCursorChange} />

      {/* Writing & Lessons Notes */}
      <NotesSection onCursorChange={handleCursorChange} />

      {/* Direct Collaboration Contact */}
      <ContactSection onCursorChange={handleCursorChange} />

      {/* Footer */}
      <Footer onCursorChange={handleCursorChange} />
    </main>
  );
}
