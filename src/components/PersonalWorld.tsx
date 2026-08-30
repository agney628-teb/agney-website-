'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { PERSONAL_INTERESTS } from '@/data/portfolioData';

interface PersonalWorldProps {
  onCursorChange: (mode: 'default' | 'view' | 'explore' | 'play' | 'open', text?: string) => void;
}

export default function PersonalWorld({ onCursorChange }: PersonalWorldProps) {
  return (
    <section className="py-28 px-6 md:px-12 bg-paper-dark/30 dark:bg-dark-surface/40 border-y border-paper-dark dark:border-dark-border">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-paper-dark dark:border-dark-border pb-8">
          <div className="space-y-3">
            <div className="text-xs font-mono tracking-widest text-accent uppercase flex items-center gap-3">
              <span className="w-8 h-px bg-accent" />
              <span>10 / PERSONAL WORLD & INSPIRATION</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-ink dark:text-dark-text uppercase">
              BEYOND THE CODE
            </h2>
          </div>
          <div className="text-xs font-mono text-ink-muted dark:text-dark-muted max-w-xs">
            Visual fragments of what fuels Agney's aesthetic direction, technical curiosity, and creative rhythm.
          </div>
        </div>

        {/* Fragment Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PERSONAL_INTERESTS.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              onMouseEnter={() => onCursorChange('explore', item.category)}
              onMouseLeave={() => onCursorChange('default')}
              className="group rounded-2xl overflow-hidden border border-paper-dark dark:border-dark-border bg-paper-light dark:bg-dark-card p-6 space-y-4 hover:border-accent transition-all duration-300 shadow-sm"
            >
              <div className="aspect-square rounded-xl overflow-hidden relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-paper-light/90 dark:bg-dark-bg/90 backdrop-blur-md text-[10px] font-mono font-bold text-accent">
                  {item.tag}
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-bold text-ink dark:text-dark-text tracking-tight group-hover:text-accent transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs font-light text-ink-muted dark:text-dark-muted leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
