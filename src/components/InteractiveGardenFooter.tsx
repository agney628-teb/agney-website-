'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { PERSONAL_INFO } from '@/data/portfolioData';

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
      scale: 0.8 + Math.random() * 0.5,
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
    <footer id="contact" className="relative pt-32 pb-16 bg-[#fff9f1] dark:bg-[#060d1d] text-ink dark:text-dark-text overflow-hidden transition-colors duration-500">
      <div className="max-w-6xl mx-auto px-6 md:px-12 text-center space-y-8 relative z-10">
        {/* Intro Subtext */}
        <p className="text-base sm:text-xl font-light text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto leading-relaxed">
          From early concepts to refined experiences, I help ambitious teams build products that earn trust, move quickly, and drive growth.
        </p>

        {/* Big Impact Headline */}
        <h2 className="text-4xl sm:text-6xl md:text-7xl dm-serif tracking-tight text-neutral-900 dark:text-white">
          Let&apos;s grow your next idea
        </h2>
      </div>

      {/* Interactive Soil & Blooming Meadow Area */}
      <div
        ref={soilRef}
        onClick={handlePlantFlower}
        onTouchStart={handleTouchPlant}
        onMouseEnter={() => onCursorChange('play', 'WATER 🌱')}
        onMouseLeave={() => onCursorChange('default')}
        className="relative w-full h-[320px] md:h-[380px] mt-16 cursor-crosshair select-none touch-none"
      >
        {/* Soil Base Landscape SVG */}
        <div className="absolute bottom-0 left-0 right-0 w-full h-full pointer-events-none">
          <svg viewBox="0 0 1440 380" preserveAspectRatio="none" className="w-full h-full fill-[#1c1c1c] dark:fill-[#0c1220]">
            <path d="M0,180 C240,120 480,220 720,160 C960,100 1200,200 1440,140 L1440,380 L0,380 Z" />
          </svg>
        </div>

        {/* Soil Grass & Texture Layer */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#111111] to-transparent dark:from-[#050912] pointer-events-none" />

        {/* Click to Grow Water Tool Hint */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none text-center px-4 w-full">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/85 dark:bg-black/85 backdrop-blur-md border border-neutral-300 dark:border-neutral-700 font-mono text-xs text-neutral-800 dark:text-neutral-200 shadow-lg">
            <span>🌱 TAP OR CLICK ANYWHERE ON SOIL TO GROW FLOWERS</span>
          </div>
        </div>

        {/* Blooming Botanical Flowers */}
        <div className="absolute inset-0 pointer-events-none">
          {flowers.map((f) => (
            <motion.div
              key={f.id}
              initial={{ scale: 0, y: 40, opacity: 0 }}
              animate={{ scale: f.scale, y: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              style={{ left: f.x, top: f.y }}
              className="absolute transform -translate-x-1/2 -translate-y-full origin-bottom"
            >
              {f.type === 'daisy' && (
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-white border-2 border-amber-300 flex items-center justify-center shadow-md">
                    <div className="w-4 h-4 rounded-full bg-amber-400" />
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
                  <div className="w-14 h-14 rounded-full bg-amber-400 border-4 border-amber-500 flex items-center justify-center shadow-lg">
                    <div className="w-6 h-6 rounded-full bg-[#3d2314]" />
                  </div>
                  <div className="w-2 h-28 bg-emerald-600 rounded-full" />
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
          Designed by Agney · Malappuram, Kerala, India ©{new Date().getFullYear()}
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
    </footer>
  );
}
