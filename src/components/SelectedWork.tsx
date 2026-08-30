'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PROJECTS, Project } from '@/data/portfolioData';
import CaseStudyModal from './CaseStudyModal';
import { ArrowUpRight, Sparkles } from 'lucide-react';

interface SelectedWorkProps {
  onCursorChange: (mode: 'default' | 'view' | 'explore' | 'play' | 'open', text?: string) => void;
}

const CATEGORIES = ['All', 'Robotics & AI', 'HealthTech', 'Computer Vision', 'IoT & Tools'];

export default function SelectedWork({ onCursorChange }: SelectedWorkProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const clientLogos = [
    'TEB INNOVATIONS',
    'EDU BOT AI',
    'DR. ZOE',
    'EYE SIGHT AI',
    'PYROLINK',
    'PMSAPTHSS KAKKOVE',
    'ATL LABS',
    'YIP 7.0 STATE WINNER',
  ];

  const filteredProjects = selectedCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => {
        if (selectedCategory === 'Robotics & AI') return p.tags.includes('Robotics') || p.tags.includes('AI Teacher');
        if (selectedCategory === 'HealthTech') return p.tags.includes('HealthTech') || p.tags.includes('AI Doctor');
        if (selectedCategory === 'Computer Vision') return p.tags.includes('Computer Vision');
        if (selectedCategory === 'IoT & Tools') return p.tags.includes('IoT');
        return true;
      });

  return (
    <section id="work" className="projects-overlap py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Infinite Logo Marquee Runner */}
        <div className="space-y-4">
          <div className="text-center font-mono text-xs text-neutral-500 dark:text-neutral-400 tracking-widest uppercase">
            VENTURES · PROJECTS · INNOVATIONS
          </div>

          <div className="logo-marquee-wrap border-y border-black/10 dark:border-white/10 py-4">
            <div className="logo-marquee-inner">
              {[...clientLogos, ...clientLogos].map((name, i) => (
                <div
                  key={i}
                  className="font-mono text-sm font-bold tracking-widest text-neutral-700 dark:text-neutral-300 uppercase whitespace-nowrap flex items-center gap-8"
                >
                  <span>{name}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ffda3f]" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Live Project Impact Metrics Counter */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 rounded-3xl bg-paper-light/60 dark:bg-[#0b1a3a]/60 border border-black/10 dark:border-white/10 backdrop-blur-md">
          <div className="space-y-1 text-center border-r border-black/10 dark:border-white/10 last:border-0">
            <div className="text-3xl sm:text-4xl font-extrabold font-mono text-[#e5a500] dark:text-[#ffda3f]">
              20+
            </div>
            <div className="text-xs font-mono text-neutral-600 dark:text-neutral-400 uppercase">Edu Bot Features</div>
          </div>

          <div className="space-y-1 text-center border-r border-black/10 dark:border-white/10 last:border-0">
            <div className="text-3xl sm:text-4xl font-extrabold font-mono text-[#e5a500] dark:text-[#ffda3f]">
              YIP 7.0
            </div>
            <div className="text-xs font-mono text-neutral-600 dark:text-neutral-400 uppercase">State Winner</div>
          </div>

          <div className="space-y-1 text-center border-r border-black/10 dark:border-white/10 last:border-0">
            <div className="text-3xl sm:text-4xl font-extrabold font-mono text-[#e5a500] dark:text-[#ffda3f]">
              Top 7
            </div>
            <div className="text-xs font-mono text-neutral-600 dark:text-neutral-400 uppercase">BYKM Robotics</div>
          </div>

          <div className="space-y-1 text-center">
            <div className="text-3xl sm:text-4xl font-extrabold font-mono text-[#e5a500] dark:text-[#ffda3f]">
              9th Std
            </div>
            <div className="text-xs font-mono text-neutral-600 dark:text-neutral-400 uppercase">TEB Co-Founded</div>
          </div>
        </div>

        {/* Header & Category Filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-black/10 dark:border-white/10 pb-8">
          <div className="space-y-2">
            <div className="text-xs font-mono tracking-widest text-[#e5a500] dark:text-[#ffda3f] uppercase flex items-center gap-2 font-bold">
              <Sparkles size={13} />
              <span>CORE INNOVATIONS</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-neutral-900 dark:text-white uppercase">
              FEATURED PROJECTS
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full font-mono text-xs transition-all ${
                  selectedCategory === cat
                    ? 'bg-neutral-900 dark:bg-white text-white dark:text-black font-bold shadow-md'
                    : 'bg-paper-light dark:bg-[#0b1a3a] border border-black/10 dark:border-white/10 text-neutral-600 dark:text-neutral-400 hover:border-black dark:hover:border-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Asymmetric Project Tiles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              onClick={() => setSelectedProject(project)}
              onMouseEnter={() => onCursorChange('view', 'EXPLORE')}
              onMouseLeave={() => onCursorChange('default')}
              className="group cursor-pointer rounded-3xl overflow-hidden border border-black/10 dark:border-white/10 bg-paper-light/80 dark:bg-[#0b1a3a]/70 p-7 space-y-6 hover:border-[#ffda3f] dark:hover:border-[#ffda3f] transition-all duration-500 shadow-xl backdrop-blur-md"
            >
              <div className="flex items-center justify-between font-mono text-xs text-neutral-500 dark:text-neutral-400">
                <span className="font-bold text-[#e5a500] dark:text-[#ffda3f]">{project.number}</span>
                <span>{project.year}</span>
              </div>

              <div className="aspect-[16/10] rounded-2xl overflow-hidden relative border border-black/10 dark:border-white/10">
                <img
                  src={project.coverImage}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/85 font-mono text-[10px] text-white font-bold backdrop-blur-md">
                  {project.category}
                </div>
              </div>

              <div className="space-y-2.5">
                <h3 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white group-hover:text-[#e5a500] dark:group-hover:text-[#ffda3f] transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm font-light text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Tech Stack Chips */}
              <div className="flex flex-wrap gap-2 pt-1">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-md bg-black/5 dark:bg-white/5 font-mono text-[10px] text-neutral-700 dark:text-neutral-300 border border-black/10 dark:border-white/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="pt-4 border-t border-black/10 dark:border-white/10 flex items-center justify-between font-mono text-xs">
                <span className="text-neutral-500 dark:text-neutral-400">{project.role}</span>
                <span className="font-bold text-neutral-900 dark:text-white group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  CASE STUDY <ArrowUpRight size={14} className="text-[#e5a500] dark:text-[#ffda3f]" />
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
