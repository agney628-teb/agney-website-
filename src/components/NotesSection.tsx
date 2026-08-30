'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NOTES, Note } from '@/data/portfolioData';
import { ArrowUpRight, X } from 'lucide-react';

interface NotesSectionProps {
  onCursorChange: (mode: 'default' | 'view' | 'explore' | 'play' | 'open', text?: string) => void;
}

export default function NotesSection({ onCursorChange }: NotesSectionProps) {
  const [activeNote, setActiveNote] = useState<Note | null>(null);

  return (
    <section className="py-28 px-6 md:px-12 bg-paper-secondary dark:bg-dark-surface border-y border-paper-dark dark:border-dark-border">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-paper-dark dark:border-dark-border pb-8">
          <div>
            <div className="text-xs font-mono tracking-widest text-ink-muted dark:text-dark-muted uppercase mb-2">
              Writing & Lessons
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-ink dark:text-dark-text uppercase">
              Notes
            </h2>
          </div>
          <div className="text-xs font-mono text-ink-muted dark:text-dark-muted">
            Essays on product design, co-founding, and code craft
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {NOTES.map((note, idx) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onClick={() => setActiveNote(note)}
              onMouseEnter={() => onCursorChange('open', 'READ')}
              onMouseLeave={() => onCursorChange('default')}
              className="group cursor-pointer rounded-xl border border-paper-dark dark:border-dark-border bg-paper-light dark:bg-dark-card p-8 flex flex-col justify-between space-y-6 hover:border-ink dark:hover:border-dark-text transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-ink-muted dark:text-dark-muted">
                  <span>{note.category}</span>
                  <span>{note.date}</span>
                </div>

                <h3 className="text-xl font-bold text-ink dark:text-dark-text tracking-tight group-hover:opacity-80 transition-opacity">
                  {note.title}
                </h3>

                <p className="text-sm font-light text-ink-muted dark:text-dark-muted leading-relaxed">
                  {note.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-paper-dark dark:border-dark-border flex items-center justify-between text-xs font-mono text-ink-muted dark:text-dark-muted">
                <span>{note.readTime}</span>
                <span className="font-bold text-ink dark:text-dark-text flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Read Essay <ArrowUpRight size={13} />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Reader Modal */}
      <AnimatePresence>
        {activeNote && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            onClick={() => setActiveNote(null)}
          >
            <motion.div
              initial={{ scale: 0.96 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.96 }}
              className="bg-paper-light dark:bg-dark-bg border border-paper-dark dark:border-dark-border rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-8 sm:p-10 space-y-6 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-paper-dark dark:border-dark-border pb-4">
                <div className="text-xs font-mono text-ink-muted dark:text-dark-muted">
                  {activeNote.category} · {activeNote.readTime}
                </div>
                <button onClick={() => setActiveNote(null)} className="p-1 text-ink dark:text-dark-text">
                  <X size={18} />
                </button>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-ink dark:text-dark-text tracking-tight leading-snug">
                {activeNote.title}
              </h1>

              <div className="text-sm sm:text-base font-light text-ink-muted dark:text-dark-muted leading-relaxed whitespace-pre-line">
                {activeNote.content}
              </div>

              <div className="pt-6 border-t border-paper-dark dark:border-dark-border flex justify-end">
                <button onClick={() => setActiveNote(null)} className="px-5 py-2 rounded-full bg-ink dark:bg-dark-text text-paper-light dark:text-dark-bg font-mono text-xs font-bold">
                  Close Essay
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
