'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight } from 'lucide-react';
import { Project } from '@/data/portfolioData';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
  onCursorChange: (mode: 'default' | 'view' | 'explore' | 'play' | 'open', text?: string) => void;
}

export default function CaseStudyModal({ project, onClose, onCursorChange }: CaseStudyModalProps) {
  if (!project) return null;

  const cs = project.caseStudy;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-md overflow-y-auto flex justify-center p-4 sm:p-8"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 60, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="bg-paper-light dark:bg-dark-bg border border-paper-dark dark:border-dark-border rounded-2xl max-w-4xl w-full my-auto overflow-hidden shadow-2xl relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 z-20 bg-paper-light/95 dark:bg-dark-bg/95 backdrop-blur-md border-b border-paper-dark dark:border-dark-border px-8 py-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold text-ink dark:text-dark-text">{project.number}</span>
              <h2 className="text-lg font-bold text-ink dark:text-dark-text tracking-tight uppercase">
                {project.title}
              </h2>
            </div>

            <button
              onClick={onClose}
              onMouseEnter={() => onCursorChange('open', 'CLOSE')}
              onMouseLeave={() => onCursorChange('default')}
              className="p-2 text-ink dark:text-dark-text hover:opacity-70 transition-opacity"
              aria-label="Close Case Study"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="p-8 sm:p-12 space-y-12">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-paper-dark dark:border-dark-border pb-4 text-xs font-mono text-ink-muted dark:text-dark-muted">
                <div>Year: <span className="text-ink dark:text-dark-text font-semibold">{project.year}</span></div>
                <div>Role: <span className="text-ink dark:text-dark-text font-semibold">{project.role}</span></div>
                {project.client && <div>Client: <span className="text-ink dark:text-dark-text font-semibold">{project.client}</span></div>}
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-ink dark:text-dark-text tracking-tight leading-tight">
                {project.summary}
              </h1>
            </div>

            <div className="rounded-xl overflow-hidden border border-paper-dark dark:border-dark-border aspect-video">
              <img src={project.coverImage} alt={project.title} className="w-full h-full object-cover" />
            </div>

            {cs && (
              <div className="space-y-10 text-ink dark:text-dark-text">
                <div className="space-y-3">
                  <h3 className="text-xs font-mono text-ink-muted dark:text-dark-muted uppercase">Overview & Architecture</h3>
                  <p className="text-base sm:text-lg font-light leading-relaxed text-ink-muted dark:text-dark-muted">
                    {cs.overview}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-paper-dark dark:border-dark-border pt-8">
                  <div className="space-y-2">
                    <h4 className="text-xs font-mono text-ink-muted dark:text-dark-muted uppercase">The Problem</h4>
                    <p className="text-sm font-light text-ink-muted dark:text-dark-muted leading-relaxed">{cs.problem}</p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-xs font-mono text-ink-muted dark:text-dark-muted uppercase">The Idea & Strategy</h4>
                    <p className="text-sm font-light text-ink-muted dark:text-dark-muted leading-relaxed">{cs.idea}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-paper-dark dark:border-dark-border pt-8">
                  <div className="space-y-2">
                    <h4 className="text-xs font-mono text-ink-muted dark:text-dark-muted uppercase">Design & Interaction</h4>
                    <p className="text-sm font-light text-ink-muted dark:text-dark-muted leading-relaxed">{cs.design}</p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-xs font-mono text-ink-muted dark:text-dark-muted uppercase">Engineering Build</h4>
                    <p className="text-sm font-light text-ink-muted dark:text-dark-muted leading-relaxed">{cs.build}</p>
                  </div>
                </div>

                <div className="p-6 rounded-xl bg-paper dark:bg-dark-card border border-paper-dark dark:border-dark-border space-y-3">
                  <div className="text-xs font-mono text-ink dark:text-dark-text uppercase font-bold">Results & Impact</div>
                  <p className="text-base font-bold text-ink dark:text-dark-text leading-snug">{cs.result}</p>
                  <p className="text-xs text-ink-muted dark:text-dark-muted italic">&ldquo;{cs.learnings}&rdquo;</p>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between border-t border-paper-dark dark:border-dark-border pt-6">
              <button onClick={onClose} className="text-xs font-mono text-ink-muted dark:text-dark-muted hover:text-ink dark:hover:text-dark-text">
                ← Back to Portfolio
              </button>
              <button onClick={onClose} className="px-5 py-2.5 rounded-full bg-ink dark:bg-dark-text text-paper-light dark:text-dark-bg font-mono text-xs font-bold">
                Close Article
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
