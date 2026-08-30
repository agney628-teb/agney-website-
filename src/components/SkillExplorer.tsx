'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CAPABILITIES } from '@/data/portfolioData';

interface SkillExplorerProps {
  onCursorChange: (mode: 'default' | 'view' | 'explore' | 'play' | 'open', text?: string) => void;
}

export default function SkillExplorer({ onCursorChange }: SkillExplorerProps) {
  return (
    <section className="py-28 px-6 md:px-12 bg-paper-secondary dark:bg-dark-surface border-y border-paper-dark dark:border-dark-border">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-paper-dark dark:border-dark-border pb-8">
          <div>
            <div className="text-xs font-mono tracking-widest text-ink-muted dark:text-dark-muted uppercase mb-2">
              Capabilities
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-ink dark:text-dark-text uppercase">
              Skills & Craft
            </h2>
          </div>
          <div className="text-xs font-mono text-ink-muted dark:text-dark-muted">
            Design intuition paired with front-end engineering
          </div>
        </div>

        {/* Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {CAPABILITIES.map((cap, idx) => (
            <motion.div
              key={cap.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onMouseEnter={() => onCursorChange('explore', cap.category)}
              onMouseLeave={() => onCursorChange('default')}
              className="p-6 rounded-xl bg-paper-light dark:bg-dark-card border border-paper-dark dark:border-dark-border space-y-6 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono text-ink-muted dark:text-dark-muted">
                  <span>0{idx + 1}</span>
                  <span className="font-bold text-ink dark:text-dark-text">{cap.category}</span>
                </div>

                <h3 className="text-xl font-bold text-ink dark:text-dark-text tracking-tight">
                  {cap.subtitle}
                </h3>

                <p className="text-xs text-ink-muted dark:text-dark-muted leading-relaxed font-light">
                  {cap.description}
                </p>
              </div>

              <div className="pt-4 border-t border-paper-dark dark:border-dark-border flex flex-wrap gap-1.5">
                {cap.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-0.5 rounded text-[10px] font-mono bg-paper dark:bg-dark-bg text-ink dark:text-dark-text border border-paper-dark dark:border-dark-border"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
