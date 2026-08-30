'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
  pos: number; // -1 (left), 0 (center), 1 (right)
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    quote: 'Agney has a rare combination of refined UI/UX design intuition, hardware innovation, and deep engineering capability. He led Edu Bot AI with incredible speed and craftsmanship.',
    author: 'Haseef Muhammed',
    role: 'CEO & Co-Founder',
    company: 'TEB Innovations',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    pos: -1,
  },
  {
    id: 't-2',
    quote: 'Starting robotics in 9th standard through our ATL Lab, Agney proved to be a natural problem solver. He turns complex micro-controller telemetry and AI logic into accessible, real-world solutions.',
    author: 'PMSAPTHSS Kakkove ATL Mentor',
    role: 'Robotics & STEM Coordinator',
    company: 'PMSAPTHSS Kakkove',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    pos: 0,
  },
  {
    id: 't-3',
    quote: 'Agney operates from first principles. From designing Dr. Zoe to winning YIP 7.0 State Winner, his attention to detail in design, AI, and robotics is world-class.',
    author: 'State Innovation Evaluator',
    role: 'YIP Technical Jury',
    company: 'Young Innovators Programme',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    pos: 1,
  },
];

interface TestimonialsProps {
  onCursorChange: (mode: 'default' | 'view' | 'explore' | 'play' | 'open', text?: string) => void;
}

export default function TestimonialsDeck({ onCursorChange }: TestimonialsProps) {
  const [spread, setSpread] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const el = document.getElementById('testimonials-deck');
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const windowH = window.innerHeight;

      // Calculate spread factor from 0 (stacked) to 1 (fanned out) as user scrolls into view
      const start = windowH * 0.9;
      const end = windowH * 0.25;
      const rawSpread = (start - rect.top) / (start - end);
      const clampedSpread = Math.max(0, Math.min(1, rawSpread));

      setSpread(clampedSpread);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="testimonials-deck"
      className="pt-24 pb-32 px-6 md:px-12 relative overflow-hidden bg-paper-light dark:bg-[#081329] text-ink dark:text-dark-text border-t border-black/10 dark:border-white/10 transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        {/* Header Label matching reference video */}
        <div className="text-center space-y-2">
          <div className="font-mono text-xs text-neutral-500 dark:text-neutral-400 tracking-[0.25em] uppercase font-bold">
            TESTIMONIALS
          </div>
        </div>

        {/* Desktop Fanned-Out Glass Card Deck vs Mobile Responsive Stack */}
        {isMobile ? (
          <div className="flex flex-col gap-6 max-w-lg mx-auto">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="p-8 rounded-[28px] bg-paper-light/95 dark:bg-[#0e1d3d]/90 backdrop-blur-xl border border-black/10 dark:border-white/10 shadow-xl space-y-6"
              >
                {/* Green Quote Badge */}
                <div className="w-12 h-12 rounded-2xl bg-[#528a47]/15 border border-[#528a47]/30 flex items-center justify-center text-[#528a47] dark:text-[#7bc46f]">
                  <Quote size={24} className="fill-current" />
                </div>

                <p className="text-base font-normal text-neutral-800 dark:text-neutral-200 leading-relaxed">
                  {t.quote}
                </p>

                <div className="pt-4 border-t border-black/10 dark:border-white/10 flex items-center gap-4">
                  <img
                    src={t.avatar}
                    alt={t.author}
                    className="w-11 h-11 rounded-full object-cover border border-[#ffda3f]/50"
                  />
                  <div>
                    <div className="text-sm font-bold text-neutral-900 dark:text-white">{t.author}</div>
                    <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400">{t.role} · {t.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="relative min-h-[500px] flex items-center justify-center">
            <div className="relative w-full max-w-[400px] h-[480px] flex items-center justify-center">
              {TESTIMONIALS.map((t) => {
                const translateX = t.pos * spread * 410;
                const rotate = t.pos * spread * 2.5;

                return (
                  <div
                    key={t.id}
                    onMouseEnter={() => onCursorChange('explore', t.company)}
                    onMouseLeave={() => onCursorChange('default')}
                    style={{
                      transform: `translateX(${translateX}px) rotate(${rotate}deg) scale(${1 - Math.abs(t.pos) * 0.03 * (1 - spread)})`,
                      zIndex: t.pos === 0 ? 30 : 20,
                    }}
                    className="absolute inset-0 p-8 rounded-[30px] bg-paper-light/95 dark:bg-[#0e1d3d]/90 backdrop-blur-xl border border-black/10 dark:border-white/10 shadow-2xl flex flex-col justify-between transition-transform duration-200 ease-out cursor-pointer hover:border-[#ffda3f]"
                  >
                    {/* Green Quote Badge */}
                    <div className="w-12 h-12 rounded-2xl bg-[#528a47]/15 border border-[#528a47]/30 flex items-center justify-center text-[#528a47] dark:text-[#7bc46f]">
                      <Quote size={24} className="fill-current" />
                    </div>

                    <p className="text-base sm:text-[17px] font-normal text-neutral-800 dark:text-neutral-200 leading-relaxed">
                      {t.quote}
                    </p>

                    <div className="pt-6 border-t border-black/10 dark:border-white/10 flex items-center gap-4">
                      <img
                        src={t.avatar}
                        alt={t.author}
                        className="w-12 h-12 rounded-full object-cover border border-[#ffda3f]/50"
                      />
                      <div>
                        <div className="text-sm font-bold text-neutral-900 dark:text-white">{t.author}</div>
                        <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400">{t.role} · {t.company}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
