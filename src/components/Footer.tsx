'use client';

import React from 'react';
import { ArrowUp } from 'lucide-react';

interface FooterProps {
  onCursorChange: (mode: 'default' | 'view' | 'explore' | 'play' | 'open', text?: string) => void;
}

export default function Footer({ onCursorChange }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-paper-dark dark:border-dark-border py-10 px-6 md:px-12 bg-paper-light dark:bg-dark-bg text-ink dark:text-dark-text">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold">AGNEY</span>
          <span className="text-ink-muted dark:text-dark-muted">· Designer, Developer & Co-Founder @ TEB Innovations</span>
        </div>

        <div className="text-ink-muted dark:text-dark-muted">
          © {new Date().getFullYear()} AGNEY
        </div>

        <button
          onClick={scrollToTop}
          onMouseEnter={() => onCursorChange('open', 'TOP ↑')}
          onMouseLeave={() => onCursorChange('default')}
          className="flex items-center gap-1.5 text-ink-muted dark:text-dark-muted hover:text-ink dark:hover:text-dark-text transition-colors"
        >
          <span>Back to Top</span> <ArrowUp size={13} />
        </button>
      </div>
    </footer>
  );
}
