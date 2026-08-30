'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS, Project } from '@/data/portfolioData';
import CaseStudyModal from './CaseStudyModal';
import { ArrowUpRight, Sparkles, Filter, ExternalLink, Code2, Award } from 'lucide-react';

interface SelectedWorkProps {
  onCursorChange: (mode: 'default' | 'view' | 'explore' | 'play' | 'open', text?: string) => void;
}

const CATEGORIES = ['All', 'AI & Hardware', 'Web Platform', 'Creative Tech', 'Design Systems'];

export default function SelectedWork({ onCursorChange }: SelectedWorkProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const clientLogos = [
    'TEB INNOVATIONS',
    'EDU BOT AI',
    'ATAL TINKERING LABS',
    'FIRST GLOBAL CHALLENGE',
    'PYROLINK SUITE',
    'CREATIVE TECH LAB',
  ];

  const filteredProjects = selectedCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category.toLowerCase().includes(selectedCategory.toLowerCase()) || p.tags.some(t => t.toLowerCase().includes(selectedCategory.toLowerCase())));

  return (
    <section id="work" className="projects-overlap py-28 px-6 md:px-12">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Infinite Logo Marquee Runner */}
        <div className="space-y-4">
          <div className="text-center font-mono text-xs text-ink-muted dark:text-dark-muted tracking-widest uppercase">
            COLLABORATIONS & INITIATIVES
          </div>

          <div className="logo-marquee-wrap border-y border-paper-dark dark:border-dark-border py-4">
            <div className="logo-marquee-inner">
              {[...clientLogos, ...clientLogos].map((name, i) => (
                <div
                  key={i}
                  className="font-mono text-sm font-bold tracking-widest text-ink/70 dark:text-dark-text/70 uppercase whitespace-nowrap flex items-center gap-8"
                >
                  <span>{name}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Live Project Impact Metrics Counter */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 rounded-3xl bg-paper-light/60 dark:bg-dark-card/60 border border-paper-dark dark:border-dark-border backdrop-blur-md">
          <div className="space-y-1 text-center border-r border-paper-dark dark:border-dark-border last:border-0">
            <div className="text-3xl sm:text-4xl font-extrabold text-ink dark:text-dark-text font-mono text-accent">
              12+
            </div>
            <div className="text-xs font-mono text-ink-muted dark:text-dark-muted uppercase">Incubators Equipped</div>
          </div>

          <div className="space-y-1 text-center border-r border-paper-dark dark:border-dark-border last:border-0">
            <div className="text-3xl sm:text-4xl font-extrabold text-ink dark:text-dark-text font-mono text-accent">
              100K+
            </div>
            <div className="text-xs font-mono text-ink-muted dark:text-dark-muted uppercase">Media Impressions</div>
          </div>

          <div className="space-y-1 text-center border-r border-paper-dark dark:border-dark-border last:border-0">
            <div className="text-3xl sm:text-4xl font-extrabold text-ink dark:text-dark-text font-mono text-accent">
              4+
            </div>
            <div className="text-xs font-mono text-ink-muted dark:text-dark-muted uppercase">Awards & Accolades</div>
          </div>

          <div className="space-y-1 text-center">
            <div className="text-3xl sm:text-4xl font-extrabold text-ink dark:text-dark-text font-mono text-accent">
              99.9%
            </div>
            <div className="text-xs font-mono text-ink-muted dark:text-dark-muted uppercase">Client Satisfaction</div>
          </div>
        </div>

        {/* Header & Category Filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-paper-dark dark:border-dark-border pb-8">
          <div className="space-y-2">
            <div className="text-xs font-mono tracking-widest text-accent uppercase flex items-center gap-2">
              <Sparkles size={13} />
              <span>SELECTED WORK</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-ink dark:text-dark-text uppercase">
              FEATURED PROJECTS
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full font-mono text-xs transition-all ${
                  selectedCategory === cat
                    ? 'bg-ink dark:bg-dark-text text-paper-light dark:text-dark-bg font-bold shadow-md'
                    : 'bg-paper-light dark:bg-dark-card border border-paper-dark dark:border-dark-border text-ink-muted dark:text-dark-muted hover:border-ink dark:hover:border-dark-text'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Asymmetric Project Tiles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.1 }}
              onClick={() => setSelectedProject(project)}
              onMouseEnter={() => onCursorChange('view', 'EXPLORE')}
              onMouseLeave={() => onCursorChange('default')}
              className="group cursor-pointer rounded-3xl overflow-hidden border border-paper-dark dark:border-dark-border bg-paper-light dark:bg-dark-card p-8 space-y-6 hover:border-accent transition-all duration-500 shadow-2xl"
            >
              <div className="flex items-center justify-between font-mono text-xs text-ink-muted dark:text-dark-muted">
                <span className="font-bold text-accent">{project.number}</span>
                <span>{project.year}</span>
              </div>

              <div className="aspect-[16/10] rounded-2xl overflow-hidden relative border border-paper-dark dark:border-dark-border">
                <img
                  src={project.coverImage}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/80 font-mono text-[10px] text-white font-bold backdrop-blur-md">
                  {project.category}
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-3xl font-extrabold tracking-tight text-ink dark:text-dark-text group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm font-light text-ink-muted dark:text-dark-muted leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Tech Stack Chips */}
              <div className="flex flex-wrap gap-2 pt-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-md bg-paper-dark/60 dark:bg-dark-surface font-mono text-[10px] text-ink-muted dark:text-dark-muted border border-paper-dark dark:border-dark-border"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="pt-4 border-t border-paper-dark dark:border-dark-border flex items-center justify-between font-mono text-xs">
                <span className="text-ink-muted dark:text-dark-muted">{project.role}</span>
                <span className="font-bold text-ink dark:text-dark-text group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  CASE STUDY <ArrowUpRight size={14} className="text-accent" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <CaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onCursorChange={onCursorChange}
      />
    </section>
  );
}
