'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { PERSONAL_INFO } from '@/data/portfolioData';

interface ManifestoProps {
  onCursorChange: (mode: 'default' | 'view' | 'explore' | 'play' | 'open', text?: string) => void;
}

export default function Manifesto({ onCursorChange }: ManifestoProps) {
  return (
    <section className="py-24 px-6 md:px-12 border-y border-paper-dark dark:border-dark-border">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-xs font-mono tracking-widest text-ink-muted dark:text-dark-muted uppercase">
          Philosophy & Vision
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-snug text-ink dark:text-dark-text"
        >
          &ldquo;{PERSONAL_INFO.manifesto[0]}&rdquo;
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg sm:text-2xl font-light text-ink-muted dark:text-dark-muted leading-relaxed"
        >
          {PERSONAL_INFO.manifesto[1]}
        </motion.p>
      </div>
    </section>
  );
}
