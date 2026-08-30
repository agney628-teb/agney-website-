'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PERSONAL_INFO } from '@/data/portfolioData';
import { X, Send, Sparkles } from 'lucide-react';

interface Flower {
  id: string;
  x: number;
  y: number;
  type: 'daisy' | 'tulip' | 'lavender' | 'sunflower';
  scale: number;
}

interface GardenProps {
  onCursorChange: (mode: 'default' | 'view' | 'explore' | 'play' | 'open', text?: string) => void;
}

export default function InteractiveGardenFooter({ onCursorChange }: GardenProps) {
  const [flowers, setFlowers] = useState<Flower[]>([
    { id: 'f-1', x: 120, y: 70, type: 'daisy', scale: 1 },
    { id: 'f-2', x: 260, y: 55, type: 'lavender', scale: 1.1 },
    { id: 'f-3', x: 420, y: 80, type: 'sunflower', scale: 1.2 },
    { id: 'f-4', x: 600, y: 50, type: 'tulip', scale: 0.95 },
    { id: 'f-5', x: 780, y: 65, type: 'daisy', scale: 1.05 },
    { id: 'f-6', x: 940, y: 75, type: 'lavender', scale: 1.15 },
    { id: 'f-7', x: 1100, y: 60, type: 'sunflower', scale: 1 },
  ]);

  const [contactOpen, setContactOpen] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const soilRef = useRef<HTMLDivElement | null>(null);

  const plantFlowerAt = (clientX: number, clientY: number) => {
    if (!soilRef.current) return;
    const rect = soilRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const types: ('daisy' | 'tulip' | 'lavender' | 'sunflower')[] = ['daisy', 'tulip', 'lavender', 'sunflower'];
    const chosenType = types[Math.floor(Math.random() * types.length)];

    const newFlower: Flower = {
      id: `f-${Date.now()}-${Math.random()}`,
      x,
      y,
      type: chosenType,
      scale: 0.85 + Math.random() * 0.45,
    };

    setFlowers((prev) => [...prev, newFlower]);
  };

  const handlePlantFlower = (e: React.MouseEvent<HTMLDivElement>) => {
    plantFlowerAt(e.clientX, e.clientY);
  };

  const handleTouchPlant = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      plantFlowerAt(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  return (
    <footer id="contact" className="relative pt-24 pb-12 bg-paper-light dark:bg-[#060d1d] text-ink dark:text-dark-text overflow-hidden transition-colors duration-500">
      {/* Top Organic Wavy Curve */}
      <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-none z-0">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-14 text-paper-light dark:text-[#081329] fill-current">
          <path d="M0,40 C320,80 640,0 960,50 C1280,100 1440,20 1440,20 L1440,0 L0,0 Z" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 text-center space-y-6 relative z-10">
        {/* Intro Subtext */}
        <p className="text-base sm:text-lg font-light text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto leading-relaxed">
          From early concepts to refined experiences, I help ambitious teams build products that earn trust, move quickly, and drive growth.
        </p>

        {/* Big Impact Headline */}
        <h2 className="text-4xl sm:text-6xl md:text-7xl dm-serif tracking-tight text-neutral-900 dark:text-white">
          Let&apos;s grow your next idea
        </h2>

        {/* Contact CTA Button */}
        <div className="pt-2">
          <button
            onClick={() => setContactOpen(true)}
            onMouseEnter={() => onCursorChange('open', 'CONTACT')}
            onMouseLeave={() => onCursorChange('default')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-black font-mono text-xs font-bold shadow-xl hover:scale-105 transition-transform cursor-pointer"
          >
            <span>START A CONVERSATION</span>
            <Sparkles size={14} className="text-[#ffda3f]" />
          </button>
        </div>
      </div>

      {/* Interactive Soil & Blooming Meadow Area */}
      <div
        ref={soilRef}
        onClick={handlePlantFlower}
        onTouchStart={handleTouchPlant}
        onMouseEnter={() => onCursorChange('play', 'CLICK TO GROW 🌱')}
        onMouseLeave={() => onCursorChange('default')}
        className="relative w-full h-[320px] md:h-[380px] mt-12 cursor-crosshair select-none touch-none"
      >
        {/* Grassy Meadow Landscape Base */}
        <div className="absolute bottom-0 left-0 right-0 w-full h-full pointer-events-none">
          <svg viewBox="0 0 1440 380" preserveAspectRatio="none" className="w-full h-full fill-[#1c1c1c] dark:fill-[#0c1220]">
            <path d="M0,180 C240,120 480,220 720,160 C960,100 1200,200 1440,140 L1440,380 L0,380 Z" />
          </svg>
        </div>

        {/* Soil Gradient Layer */}
        <div className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-[#111111] to-transparent dark:from-[#050912] pointer-events-none" />

        {/* Floating "CLICK TO GROW" Badge */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none text-center px-4 w-full">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 dark:bg-black/90 backdrop-blur-md border border-neutral-300 dark:border-neutral-700 font-mono text-xs text-neutral-800 dark:text-neutral-200 shadow-xl">
            <span className="w-2 h-2 rounded-full bg-[#ffda3f] animate-pulse" />
            <span>CLICK TO GROW FLOWERS</span>
          </div>
        </div>

        {/* Dynamic Blooming Flowers */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {flowers.map((f) => (
            <motion.div
              key={f.id}
              initial={{ scale: 0, opacity: 0, y: 40 }}
              animate={{ scale: f.scale, opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 220, damping: 14 }}
              style={{
                left: `${f.x}px`,
                top: `${f.y}px`,
              }}
              className="absolute transform -translate-x-1/2 -translate-y-full origin-bottom"
            >
              {f.type === 'daisy' && (
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-white border-2 border-amber-400 flex items-center justify-center shadow-md">
                    <div className="w-4 h-4 rounded-full bg-[#ffda3f]" />
                  </div>
                  <div className="w-1.5 h-20 bg-emerald-600 rounded-full" />
                </div>
              )}

              {f.type === 'lavender' && (
                <div className="flex flex-col items-center">
                  <div className="space-y-1 flex flex-col items-center">
                    <div className="w-3 h-4 rounded-full bg-purple-400" />
                    <div className="w-4 h-5 rounded-full bg-purple-500" />
                    <div className="w-5 h-6 rounded-full bg-purple-600" />
                  </div>
                  <div className="w-1.5 h-24 bg-emerald-700 rounded-full" />
                </div>
              )}

              {f.type === 'sunflower' && (
                <div className="flex flex-col items-center">
                  <div className="w-13 h-13 rounded-full bg-amber-400 border-4 border-amber-500 flex items-center justify-center shadow-lg">
                    <div className="w-5 h-5 rounded-full bg-[#3d2314]" />
                  </div>
                  <div className="w-2 h-26 bg-emerald-600 rounded-full" />
                </div>
              )}

              {f.type === 'tulip' && (
                <div className="flex flex-col items-center">
                  <div className="w-8 h-10 rounded-t-full bg-rose-500 border border-rose-600 shadow-md" />
                  <div className="w-1.5 h-20 bg-emerald-600 rounded-full" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="max-w-7xl mx-auto px-8 md:px-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs text-neutral-400 relative z-10 border-t border-neutral-800/40">
        <div>
          Designed by Agney A · Kerala, India ©{new Date().getFullYear()}
        </div>

        <div className="flex items-center gap-6">
          <a
            href={PERSONAL_INFO.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={PERSONAL_INFO.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            GitHub
          </a>
          <a
            href={PERSONAL_INFO.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            Instagram
          </a>
        </div>
      </div>

      {/* Slide-Over Contact Sheet matching "Grow together?" */}
      <AnimatePresence>
        {contactOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="w-full max-w-lg h-full bg-paper-light dark:bg-[#071126] border-l border-black/10 dark:border-white/10 p-8 sm:p-12 overflow-y-auto flex flex-col justify-between shadow-2xl"
            >
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffda3f]/15 border border-[#ffda3f]/40 font-mono text-[11px] text-neutral-900 dark:text-[#ffda3f] font-semibold uppercase">
                    <span className="w-2 h-2 rounded-full bg-[#ffda3f] animate-pulse" />
                    <span>AVAILABLE FOR NEW PROJECTS</span>
                  </div>
                  <button
                    onClick={() => setContactOpen(false)}
                    className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-3">
                  <h3 className="text-4xl sm:text-5xl font-serif text-neutral-900 dark:text-white">
                    Grow together?
                  </h3>
                  <p className="text-sm font-light text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    Tell me what you&apos;re growing — a product, a brand, a robotics or AI idea. I&apos;ll write back promptly.
                  </p>
                </div>

                {formSent ? (
                  <div className="p-6 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 space-y-2 text-center">
                    <div className="font-bold">Message received!</div>
                    <div className="text-xs">Thanks for reaching out. Agney will reply back soon.</div>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setFormSent(true);
                    }}
                    className="space-y-6"
                  >
                    <div className="space-y-1">
                      <label className="font-mono text-xs uppercase text-neutral-500 dark:text-neutral-400">YOUR NAME</label>
                      <input
                        type="text"
                        required
                        placeholder="Your name"
                        className="w-full px-4 py-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 font-mono text-sm focus:outline-none focus:border-[#ffda3f]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-mono text-xs uppercase text-neutral-500 dark:text-neutral-400">EMAIL</label>
                      <input
                        type="email"
                        required
                        placeholder="you@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 font-mono text-sm focus:outline-none focus:border-[#ffda3f]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-mono text-xs uppercase text-neutral-500 dark:text-neutral-400">WHAT ARE WE MAKING?</label>
                      <textarea
                        rows={4}
                        required
                        placeholder="A few lines about your project, timeline, or idea"
                        className="w-full px-4 py-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 font-mono text-sm focus:outline-none focus:border-[#ffda3f]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-black font-mono text-xs font-bold flex items-center justify-center gap-2 shadow-xl hover:bg-neutral-800 transition-colors"
                    >
                      <Send size={14} />
                      <span>Send it over</span>
                    </button>
                  </form>
                )}
              </div>

              <div className="pt-8 border-t border-black/10 dark:border-white/10 text-xs font-mono text-neutral-500 dark:text-neutral-400 space-y-1">
                <div>NOT A FAN OF FORMS?</div>
                <a href={`mailto:${PERSONAL_INFO.email}`} className="text-neutral-900 dark:text-white underline font-bold">
                  {PERSONAL_INFO.email}
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
}
