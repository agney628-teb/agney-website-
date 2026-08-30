'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PERSONAL_INFO } from '@/data/portfolioData';
import { ArrowUpRight, Send, CheckCircle2 } from 'lucide-react';

interface ContactProps {
  onCursorChange: (mode: 'default' | 'view' | 'explore' | 'play' | 'open', text?: string) => void;
}

export default function ContactSection({ onCursorChange }: ContactProps) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="py-28 px-6 md:px-12 max-w-7xl mx-auto space-y-16">
      {/* Header */}
      <div className="space-y-6 border-b border-paper-dark dark:border-dark-border pb-12">
        <div className="text-xs font-mono tracking-widest text-ink-muted dark:text-dark-muted uppercase">
          Contact & Collaboration
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tight text-ink dark:text-dark-text uppercase"
        >
          Have an idea? <br />
          <span>Let&apos;s build it.</span>
        </motion.h2>

        <p className="text-lg sm:text-xl font-light text-ink-muted dark:text-dark-muted max-w-xl">
          Available for selected web development, UI/UX design, TEB Innovations collaborations, and motion graphics projects.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Contact Links */}
        <div className="lg:col-span-5 space-y-6 font-mono text-xs">
          <div className="space-y-2">
            <div className="text-ink-muted dark:text-dark-muted uppercase">Direct Email</div>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              onMouseEnter={() => onCursorChange('open', 'MAIL')}
              onMouseLeave={() => onCursorChange('default')}
              className="text-xl font-bold text-ink dark:text-dark-text hover:opacity-70 transition-opacity font-sans"
            >
              {PERSONAL_INFO.email}
            </a>
          </div>

          <div className="space-y-3 pt-4 border-t border-paper-dark dark:border-dark-border">
            <div className="text-ink-muted dark:text-dark-muted uppercase">Social Channels</div>
            <div className="flex flex-col gap-2">
              <a
                href={PERSONAL_INFO.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-lg border border-paper-dark dark:border-dark-border text-ink dark:text-dark-text hover:border-ink dark:hover:border-dark-text transition-colors"
              >
                <span>LinkedIn</span> <ArrowUpRight size={13} />
              </a>
              <a
                href={PERSONAL_INFO.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-lg border border-paper-dark dark:border-dark-border text-ink dark:text-dark-text hover:border-ink dark:hover:border-dark-text transition-colors"
              >
                <span>GitHub</span> <ArrowUpRight size={13} />
              </a>
              <a
                href={PERSONAL_INFO.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-lg border border-paper-dark dark:border-dark-border text-ink dark:text-dark-text hover:border-ink dark:hover:border-dark-text transition-colors"
              >
                <span>Instagram</span> <ArrowUpRight size={13} />
              </a>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-7 p-8 rounded-2xl bg-paper-light dark:bg-dark-card border border-paper-dark dark:border-dark-border space-y-6">
          <h3 className="text-xl font-bold text-ink dark:text-dark-text tracking-tight uppercase">
            Send Message
          </h3>

          {formSubmitted ? (
            <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2">
              <CheckCircle2 size={32} className="text-emerald-500 mx-auto" />
              <div className="text-base font-bold text-ink dark:text-dark-text">Message Sent</div>
              <p className="text-xs font-mono text-ink-muted dark:text-dark-muted">
                Thank you for reaching out. Agney will reply to your message shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-ink-muted dark:text-dark-muted">YOUR NAME</label>
                  <input
                    type="text"
                    required
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg bg-paper dark:bg-dark-bg border border-paper-dark dark:border-dark-border text-ink dark:text-dark-text font-sans text-sm focus:outline-none focus:border-ink dark:focus:border-dark-text"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-ink-muted dark:text-dark-muted">YOUR EMAIL</label>
                  <input
                    type="email"
                    required
                    placeholder="Email address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg bg-paper dark:bg-dark-bg border border-paper-dark dark:border-dark-border text-ink dark:text-dark-text font-sans text-sm focus:outline-none focus:border-ink dark:focus:border-dark-text"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-ink-muted dark:text-dark-muted">MESSAGE</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Project details..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg bg-paper dark:bg-dark-bg border border-paper-dark dark:border-dark-border text-ink dark:text-dark-text font-sans text-sm focus:outline-none focus:border-ink dark:focus:border-dark-text resize-none"
                />
              </div>

              <button
                type="submit"
                onMouseEnter={() => onCursorChange('open', 'SEND')}
                onMouseLeave={() => onCursorChange('default')}
                className="w-full py-3 rounded-lg bg-ink dark:bg-dark-text text-paper-light dark:text-dark-bg font-mono text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                <Send size={14} /> Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
