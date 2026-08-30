'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { EXPERIENCES } from '@/data/portfolioData';

interface ExperienceTimelineProps {
  onCursorChange: (mode: 'default' | 'view' | 'explore' | 'play' | 'open', text?: string) => void;
}

export default function ExperienceTimeline({ onCursorChange }: ExperienceTimelineProps) {
  return (
    <section id="experience" className="py-28 px-6 md:px-12 max-w-7xl mx-auto space-y-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-paper-dark dark:border-dark-border pb-8">
        <div>
          <div className="text-xs font-mono tracking-widest text-ink-muted dark:text-dark-muted uppercase mb-2">
            Career Timeline
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-ink dark:text-dark-text uppercase">
            Experience
          </h2>
        </div>

        <div className="text-xs font-mono text-ink-muted dark:text-dark-muted">
          Founding roles, design, and mentorship
        </div>
      </div>

      {/* Timeline Rows */}
      <div className="divide-y divide-paper-dark dark:divide-dark-border">
        {EXPERIENCES.map((exp, idx) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            onMouseEnter={() => onCursorChange('view', 'ROLE')}
            onMouseLeave={() => onCursorChange('default')}
            className="py-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-start"
          >
            <div className="md:col-span-3 space-y-1 font-mono text-xs">
              <div className="font-bold text-ink dark:text-dark-text">{exp.year}</div>
              <div className="text-ink-muted dark:text-dark-muted">{exp.location}</div>
            </div>

            <div className="md:col-span-6 space-y-3">
              <div>
                <h3 className="text-xl font-bold text-ink dark:text-dark-text tracking-tight">
                  {exp.role}
                </h3>
                <div className="text-xs font-mono font-bold text-ink-muted dark:text-dark-muted">
                  {exp.organization}
                </div>
              </div>

              <p className="text-sm font-light text-ink-muted dark:text-dark-muted leading-relaxed">
                {exp.description}
              </p>
            </div>

            <div className="md:col-span-3 space-y-1 text-xs font-mono text-ink-muted dark:text-dark-muted">
              {exp.highlights.map((h, hIdx) => (
                <div key={hIdx} className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-ink dark:bg-dark-text" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
