'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MOTION_REELS, MotionItem } from '@/data/portfolioData';
import { Play, X } from 'lucide-react';

interface MotionReelProps {
  onCursorChange: (mode: 'default' | 'view' | 'explore' | 'play' | 'open', text?: string) => void;
}

export default function MotionReel({ onCursorChange }: MotionReelProps) {
  const [activeReel, setActiveReel] = useState<MotionItem | null>(null);

  return (
    <section className="py-28 px-6 md:px-12 max-w-7xl mx-auto space-y-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-paper-dark dark:border-dark-border pb-8">
        <div>
          <div className="text-xs font-mono tracking-widest text-ink-muted dark:text-dark-muted uppercase mb-2">
            Cinematics
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-ink dark:text-dark-text uppercase">
            Motion & Editing
          </h2>
        </div>
        <div className="text-xs font-mono text-ink-muted dark:text-dark-muted">
          Motion graphics, video edits, and 3D typography
        </div>
      </div>

      {/* Main Player Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        onClick={() => setActiveReel(MOTION_REELS[0])}
        onMouseEnter={() => onCursorChange('play', 'REEL')}
        onMouseLeave={() => onCursorChange('default')}
        className="group cursor-pointer rounded-2xl overflow-hidden border border-paper-dark dark:border-dark-border bg-dark-bg relative aspect-[21/9] min-h-[300px]"
      >
        <img
          src={MOTION_REELS[0].thumbnail}
          alt={MOTION_REELS[0].title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
        />

        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
          <div className="w-16 h-16 rounded-full bg-paper-light text-ink flex items-center justify-center group-hover:scale-110 transition-transform">
            <Play size={24} className="ml-1 fill-current" />
          </div>
        </div>

        <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/90 to-transparent flex items-center justify-between text-white font-mono text-xs">
          <div>
            <div className="text-white/60">{MOTION_REELS[0].category}</div>
            <div className="font-bold text-lg font-sans">{MOTION_REELS[0].title}</div>
          </div>
          <div>{MOTION_REELS[0].duration}</div>
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {activeReel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setActiveReel(null)}
          >
            <motion.div
              initial={{ scale: 0.96 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.96 }}
              className="bg-black border border-white/20 rounded-2xl max-w-4xl w-full overflow-hidden relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 bg-white/5 border-b border-white/10 flex items-center justify-between text-white text-xs font-mono">
                <span>{activeReel.title}</span>
                <button onClick={() => setActiveReel(null)} className="p-1 hover:opacity-70">
                  <X size={18} />
                </button>
              </div>

              <div className="aspect-video bg-black flex items-center justify-center">
                <video src={activeReel.videoUrl} controls autoPlay className="w-full h-full object-contain" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
