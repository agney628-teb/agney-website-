'use client';

import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import CustomCursor, { CursorMode } from '@/components/CustomCursor';
import Hero from '@/components/Hero';
import IntroNarrative from '@/components/IntroNarrative';
import SelectedWork from '@/components/SelectedWork';
import PaperPlaneFlight from '@/components/PaperPlaneFlight';
import TestimonialsDeck from '@/components/TestimonialsDeck';
import InteractiveGardenFooter from '@/components/InteractiveGardenFooter';

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [cursorMode, setCursorMode] = useState<CursorMode>('default');
  const [cursorText, setCursorText] = useState<string | undefined>(undefined);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      document.body.classList.add('night');
    } else {
      root.classList.remove('dark');
      document.body.classList.remove('night');
    }
  }, [darkMode]);

  const handleCursorChange = (mode: CursorMode, text?: string) => {
    setCursorMode(mode);
    setCursorText(text);
  };

  return (
    <main className="min-h-screen relative overflow-hidden selection:bg-[#ffda3f] selection:text-black">
      {/* Continuous Scroll-Driven Coral Paper Plane Trail */}
      <PaperPlaneFlight />

      {/* Custom Spring Cursor */}
      <CustomCursor cursorMode={cursorMode} cursorText={cursorText} />

      {/* Smart Collapsing Navigation Header */}
      <Navigation
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onCursorChange={handleCursorChange}
      />

      {/* Exact Pinned Hero */}
      <Hero onCursorChange={handleCursorChange} />

      {/* Intro Narrative & Quote */}
      <IntroNarrative />

      {/* Selected Work & Collaborations Marquee */}
      <SelectedWork onCursorChange={handleCursorChange} />

      {/* Testimonials Horizontal Fan-Out Glass Deck */}
      <TestimonialsDeck onCursorChange={handleCursorChange} />

      {/* Interactive 'Let's grow your next idea' Blooming Flower Garden Footer */}
      <InteractiveGardenFooter onCursorChange={handleCursorChange} />
    </main>
  );
}
