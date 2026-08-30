'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Quote, Sparkles } from 'lucide-react';

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
    quote: 'Agney has a rare combination of refined UI/UX design intuition and deep front-end engineering capability. He delivered Edu Bot AI with incredible speed and craftsmanship.',
    author: 'Haseef Muhammed',
    role: 'CEO & Co-Founder',
    company: 'TEB Innovations',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    pos: -1,
  },
  {
    id: 't-2',
    quote: 'Working with Agney on youth robotics programs demonstrated his commitment to simplicity. He turns complex micro-controller logic into clear, beautiful interfaces.',
    author: 'Atal Tinkering Lab Incubator',
    role: 'Regional Mentor Team',
    company: 'STEM Education Council',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    pos: 0,
  },
  {
    id: 't-3',
    quote: 'Agney operates from first principles. Whether crafting kinetic video edits or building WebGL canvas tools, his attention to detail is exceptional.',
    author: 'Creative Tech Partner',
    role: 'Design Director',
    company: 'Digital Product Lab',
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
      const start = windowH;
      const end = windowH * 0.2;
      const rawSpread = (start - rect.top) / (start - end);
      const clampedSpread = Math.max(0, Math.min(1, rawSpread));

      setSpread(clampedSpread);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="testimonials-deck" className="py-32 px-6 md:px-12 relative overflow-hidden bg-paper-secondary dark:bg-dark-surface border-y border-paper-dark dark:border-dark-border">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="text-xs font-mono tracking-widest text-accent uppercase flex items-center justify-center gap-2">
            <Sparkles size={13} />
            <span>ENDORSEMENTS & COLLABORATIONS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-ink dark:text-dark-text uppercase">
            WHAT PEOPLE SAY ABOUT AGNEY
          </h2>
          <p className="text-xs font-mono text-ink-muted dark:text-dark-muted max-w-md mx-auto">
            {isMobile ? 'Swipe through the endorsement cards below' : 'Scroll down to watch the endorsement cards fan out in spatial alignment'}
          </p>
        </div>

        {/* Desktop Fanned-Out Glass Card Deck vs Mobile Responsive Grid */}
        {isMobile ? (
          <div className="flex flex-col gap-6 max-w-lg mx-auto">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="p-8 rounded-[32px] bg-paper-light/80 dark:bg-dark-card/80 backdrop-blur-xl border border-paper-dark dark:border-dark-border shadow-xl space-y-6"
              >
                <Quote size={36} className="text-accent/30" />
                <p className="text-base font-light text-ink dark:text-dark-text leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="pt-4 border-t border-paper-dark dark:border-dark-border flex items-center gap-4">
                  <img
                    src={t.avatar}
                    alt={t.author}
                    className="w-12 h-12 rounded-full object-cover border border-accent/40"
                  />
                  <div>
                    <div className="text-sm font-bold text-ink dark:text-dark-text">{t.author}</div>
                    <div className="text-xs font-mono text-ink-muted dark:text-dark-muted">{t.role} · {t.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="relative min-h-[520px] flex items-center justify-center">
            <div className="relative w-full max-w-[430px] h-[500px] flex items-center justify-center">
              {TESTIMONIALS.map((t) => {
                const translateX = t.pos * spread * 460;

                return (
                  <div
                    key={t.id}
                    onMouseEnter={() => onCursorChange('explore', t.company)}
                    onMouseLeave={() => onCursorChange('default')}
                    style={{
                      transform: `translateX(${translateX}px) scale(${1 - Math.abs(t.pos) * 0.04 * (1 - spread)})`,
                      zIndex: t.pos === 0 ? 30 : 20,
                    }}
                    className="absolute inset-0 p-8 rounded-[32px] bg-paper-light/80 dark:bg-dark-card/80 backdrop-blur-xl border border-paper-dark dark:border-dark-border shadow-2xl flex flex-col justify-between transition-transform duration-200 ease-out cursor-pointer hover:border-accent"
                  >
                    <Quote size={48} className="text-accent/30" />

                    <p className="text-base sm:text-lg font-light text-ink dark:text-dark-text leading-relaxed italic">
                      &ldquo;{t.quote}&rdquo;
                    </p>

                    <div className="pt-6 border-t border-paper-dark dark:border-dark-border flex items-center gap-4">
                      <img
                        src={t.avatar}
                        alt={t.author}
                        className="w-12 h-12 rounded-full object-cover border border-accent/40"
                      />
                      <div>
                        <div className="text-sm font-bold text-ink dark:text-dark-text">{t.author}</div>
                        <div className="text-xs font-mono text-ink-muted dark:text-dark-muted">{t.role} · {t.company}</div>
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
