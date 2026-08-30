'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface AboutSectionProps {
  onCursorChange: (mode: 'default' | 'view' | 'explore' | 'play' | 'open', text?: string) => void;
}

export default function AboutSection({ onCursorChange }: AboutSectionProps) {
  return (
    <section id="about" className="py-28 px-6 md:px-12 max-w-7xl mx-auto space-y-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-paper-dark dark:border-dark-border pb-8">
        <div>
          <div className="text-xs font-mono tracking-widest text-ink-muted dark:text-dark-muted uppercase mb-2">
            About
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-ink dark:text-dark-text uppercase">
            Who is Agney?
          </h2>
        </div>

        <div className="text-xs font-mono text-ink-muted dark:text-dark-muted">
          Designer, developer, and co-founder
        </div>
      </div>

      {/* Grid Narrative */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          onMouseEnter={() => onCursorChange('view', 'AGNEY')}
          onMouseLeave={() => onCursorChange('default')}
          className="lg:col-span-5"
        >
          <div className="rounded-2xl overflow-hidden border border-paper-dark dark:border-dark-border bg-paper-dark dark:bg-dark-card aspect-[3/4]">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=80"
              alt="Agney Portrait"
              className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </motion.div>

        <div className="lg:col-span-7 space-y-6">
          <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-ink dark:text-dark-text leading-snug">
            &ldquo;I like taking an idea apart, understanding how it works, and rebuilding it into something better.&rdquo;
          </h3>

          <div className="space-y-4 text-base sm:text-lg font-light text-ink-muted dark:text-dark-muted leading-relaxed">
            <p>
              I am a designer and front-end developer based in Malappuram, Kerala. Rather than keeping visual design separate from engineering execution, I operate across both fields simultaneously.
            </p>
            <p>
              As co-founder of <strong className="text-ink dark:text-dark-text font-bold">TEB Innovations</strong> (launched June 20, 2024), I lead creative direction across custom client web applications, brand identities, motion graphics, and educational tools like <strong className="text-ink dark:text-dark-text font-bold">Edu Bot AI</strong>.
            </p>
            <p>
              Whether editing motion showreels, writing canvas shaders, or mentoring students at Atal Tinkering Labs, my focus remains constant: create fast, functional, and well-crafted digital work.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
