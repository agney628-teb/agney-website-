'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function IntroNarrative() {
  return (
    <section className="py-28 px-8 md:px-16 max-w-5xl mx-auto text-center space-y-10 select-none relative z-10">
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-xl sm:text-2xl md:text-3xl font-light text-neutral-700 dark:text-neutral-300 leading-relaxed tracking-tight"
      >
        Four years across visual design and front-end engineering, designing what&apos;s next — from Edu Bot AI to co-founding TEB Innovations, scaling interactive hardware and web platforms across incubators.
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white leading-snug tracking-tight"
      >
        I believe every great design forms the basis for an even greater story and I&apos;m here to keep writing mine.
      </motion.h2>
    </section>
  );
}
