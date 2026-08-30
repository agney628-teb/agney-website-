'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ACHIEVEMENTS } from '@/data/portfolioData';
import { ExternalLink } from 'lucide-react';

interface AchievementsProps {
  onCursorChange: (mode: 'default' | 'view' | 'explore' | 'play' | 'open', text?: string) => void;
}

export default function AchievementsArchive({ onCursorChange }: AchievementsProps) {
  return (
    <section id="achievements" className="py-28 px-6 md:px-12 max-w-7xl mx-auto space-y-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-paper-dark dark:border-dark-border pb-8">
        <div>
          <div className="text-xs font-mono tracking-widest text-ink-muted dark:text-dark-muted uppercase mb-2">
            Recognition & Milestones
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-ink dark:text-dark-text uppercase">
            Archive
          </h2>
        </div>

        <a
          href="https://awards.tebinnovations.in"
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => onCursorChange('open', 'AWARDS ↗')}
          onMouseLeave={() => onCursorChange('default')}
          className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-ink dark:text-dark-text hover:opacity-70 transition-opacity"
        >
          awards.tebinnovations.in <ExternalLink size={13} />
        </a>
      </div>

      {/* Archive List */}
      <div className="divide-y divide-paper-dark dark:divide-dark-border">
        {ACHIEVEMENTS.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
            className="py-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline"
          >
            <div className="md:col-span-2 font-mono text-sm font-bold text-ink dark:text-dark-text">
              {item.year}
            </div>

            <div className="md:col-span-6 space-y-1">
              <h3 className="text-lg font-bold text-ink dark:text-dark-text tracking-tight">
                {item.title}
              </h3>
              <p className="text-xs font-light text-ink-muted dark:text-dark-muted leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="md:col-span-4 text-left md:text-right font-mono text-xs text-ink-muted dark:text-dark-muted">
              <div>{item.organization}</div>
              <div className="text-[10px] text-ink-faint uppercase font-semibold">{item.category}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
