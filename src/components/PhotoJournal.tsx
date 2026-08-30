'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { PHOTO_JOURNAL } from '@/data/portfolioData';
import { Camera, MapPin } from 'lucide-react';

interface PhotoJournalProps {
  onCursorChange: (mode: 'default' | 'view' | 'explore' | 'play' | 'open', text?: string) => void;
}

export default function PhotoJournal({ onCursorChange }: PhotoJournalProps) {
  return (
    <section className="py-28 px-6 md:px-12 max-w-7xl mx-auto space-y-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-paper-dark dark:border-dark-border pb-8">
        <div className="space-y-3">
          <div className="text-xs font-mono tracking-widest text-accent uppercase flex items-center gap-3">
            <span className="w-8 h-px bg-accent" />
            <span>11 / LIFE & DIARY</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-ink dark:text-dark-text uppercase">
            PHOTO JOURNAL
          </h2>
        </div>
        <div className="text-xs font-mono text-ink-muted dark:text-dark-muted max-w-xs">
          Authentic moments from studio sessions, student incubators, and founding milestones.
        </div>
      </div>

      {/* Editorial Photo Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {PHOTO_JOURNAL.map((photo, idx) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            onMouseEnter={() => onCursorChange('view', 'SNAP')}
            onMouseLeave={() => onCursorChange('default')}
            className="group rounded-2xl overflow-hidden border border-paper-dark dark:border-dark-border bg-paper-light dark:bg-dark-card p-5 space-y-4 shadow-sm"
          >
            <div className="aspect-[4/5] rounded-xl overflow-hidden relative">
              <img
                src={photo.imageUrl}
                alt={photo.caption}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/70 font-mono text-[10px] text-white">
                {photo.date}
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-accent">
                <MapPin size={12} />
                <span>{photo.location}</span>
              </div>
              <p className="text-xs font-light text-ink dark:text-dark-text leading-relaxed">
                {photo.caption}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
