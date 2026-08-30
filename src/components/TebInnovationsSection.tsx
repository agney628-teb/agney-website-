'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TEB_ECOSYSTEM } from '@/data/portfolioData';
import { ExternalLink } from 'lucide-react';

interface TebSectionProps {
  onCursorChange: (mode: 'default' | 'view' | 'explore' | 'play' | 'open', text?: string) => void;
}

export default function TebInnovationsSection({ onCursorChange }: TebSectionProps) {
  return (
    <section id="teb" className="py-28 px-6 md:px-12 bg-paper-secondary dark:bg-dark-surface border-y border-paper-dark dark:border-dark-border">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-paper-dark dark:border-dark-border pb-8">
          <div className="space-y-2">
            <div className="text-xs font-mono tracking-widest text-ink-muted dark:text-dark-muted uppercase">
              Co-Founder Chapter
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-ink dark:text-dark-text uppercase">
              TEB Innovations
            </h2>
          </div>

          <a
            href="https://tebinnovations.in"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => onCursorChange('open', 'VISIT ↗')}
            onMouseLeave={() => onCursorChange('default')}
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-ink dark:text-dark-text hover:opacity-70 transition-opacity"
          >
            tebinnovations.in <ExternalLink size={14} />
          </a>
        </div>

        {/* Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="text-xs font-mono text-ink-muted dark:text-dark-muted uppercase">
              Founded: {TEB_ECOSYSTEM.foundedDate}
            </div>

            <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-ink dark:text-dark-text leading-tight">
              A modern design studio, software lab, and youth robotics incubator in Malappuram, Kerala.
            </h3>

            <p className="text-base sm:text-lg font-light text-ink-muted dark:text-dark-muted leading-relaxed">
              {TEB_ECOSYSTEM.description}
            </p>

            <div className="text-xs font-mono text-ink-muted dark:text-dark-muted">
              Founders: <span className="text-ink dark:text-dark-text font-bold">{TEB_ECOSYSTEM.founders}</span>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            {TEB_ECOSYSTEM.stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 rounded-xl bg-paper-light dark:bg-dark-card border border-paper-dark dark:border-dark-border space-y-1"
              >
                <div className="text-2xl sm:text-3xl font-extrabold font-mono text-ink dark:text-dark-text">{stat.value}</div>
                <div className="text-xs font-mono text-ink-muted dark:text-dark-muted uppercase">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6">
          {TEB_ECOSYSTEM.pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl bg-paper-light dark:bg-dark-card border border-paper-dark dark:border-dark-border space-y-3"
            >
              <div className="text-xs font-mono font-bold text-ink-muted dark:text-dark-muted">0{idx + 1}</div>
              <h4 className="text-lg font-bold text-ink dark:text-dark-text">{pillar.title}</h4>
              <p className="text-xs text-ink-muted dark:text-dark-muted leading-relaxed">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
