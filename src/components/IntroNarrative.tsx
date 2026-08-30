'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Award, Sparkles, Cpu, GraduationCap, Building2 } from 'lucide-react';
import { ACHIEVEMENTS } from '@/data/portfolioData';

export default function IntroNarrative() {
  return (
    <section className="py-24 px-6 sm:px-10 lg:px-16 max-w-6xl mx-auto space-y-16 select-none relative z-10">
      {/* Bio Narrative */}
      <div className="space-y-8 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ffda3f]/15 border border-[#ffda3f]/40 font-mono text-xs text-[#060606] dark:text-[#ffda3f] font-semibold uppercase"
        >
          <GraduationCap size={14} />
          <span>Plus One Bio Science · PMSAPTHSS Kakkove, Kerala</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-xl sm:text-2xl md:text-3xl font-light text-neutral-700 dark:text-neutral-300 leading-relaxed tracking-tight"
        >
          Started robotics in 9th standard through the <span className="font-semibold text-neutral-900 dark:text-white">ATL Lab at PMSAPTHSS Kakkove</span>. Building <span className="font-semibold text-neutral-900 dark:text-white">Edu Bot AI</span> gave our team the strength, confidence, and courage to co-found <span className="font-semibold text-neutral-900 dark:text-white">TEB Innovations</span>.
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white leading-snug tracking-tight"
        >
          &ldquo;I believe in building real-world projects that combine technology, design, AI, and robotics to solve meaningful problems.&rdquo;
        </motion.h2>
      </div>

      {/* Honors & Awards Badge Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
        {ACHIEVEMENTS.map((ach, i) => (
          <motion.a
            key={ach.id}
            href={ach.link || "https://awards.tebinnovations.in"}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group block p-5 rounded-2xl bg-paper-light/70 dark:bg-[#0b1a3a]/60 border border-black/10 dark:border-white/10 hover:border-[#ffda3f] dark:hover:border-[#ffda3f] transition-all backdrop-blur-md shadow-sm hover:shadow-md"
          >
            <div className="flex items-center justify-between font-mono text-[11px] text-neutral-500 dark:text-neutral-400 mb-2">
              <span className="font-bold text-[#e5a500] dark:text-[#ffda3f]">{ach.badge}</span>
              <span>{ach.year}</span>
            </div>
            <h3 className="font-bold text-sm text-neutral-900 dark:text-white group-hover:text-[#e5a500] dark:group-hover:text-[#ffda3f] transition-colors leading-snug">
              {ach.title}
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-300 mt-1 line-clamp-2">
              {ach.organization}
            </p>
          </motion.a>
        ))}
      </div>

      {/* Awards Link Banner */}
      <div className="text-center pt-2">
        <a
          href="https://awards.tebinnovations.in"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-mono text-xs text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-[#ffda3f] transition-colors underline underline-offset-4"
        >
          <Award size={13} className="text-[#e5a500] dark:text-[#ffda3f]" />
          <span>View all awards & recognitions at awards.tebinnovations.in ↗</span>
        </a>
      </div>
    </section>
  );
}
