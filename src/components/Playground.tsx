'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PLAYGROUND_ITEMS, PlaygroundItem } from '@/data/portfolioData';
import { X, Play } from 'lucide-react';

interface PlaygroundProps {
  onCursorChange: (mode: 'default' | 'view' | 'explore' | 'play' | 'open', text?: string) => void;
}

export default function Playground({ onCursorChange }: PlaygroundProps) {
  const [activeItem, setActiveItem] = useState<PlaygroundItem | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!activeItem || activeItem.type !== 'particle' || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = 400);

    const particles: { x: number; y: number; vx: number; vy: number; radius: number }[] = [];

    for (let i = 0; i < 160; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        radius: Math.random() * 2 + 1,
      });
    }

    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 100) {
          const angle = Math.atan2(dy, dx);
          const force = (100 - dist) / 100;
          p.vx -= Math.cos(angle) * force * 0.5;
          p.vy -= Math.sin(angle) * force * 0.5;
        }

        p.x += p.vx;
        p.y += p.vy;

        p.vx *= 0.98;
        p.vy *= 0.98;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, [activeItem]);

  return (
    <section id="play" className="py-28 px-6 md:px-12 bg-paper-secondary dark:bg-dark-surface border-y border-paper-dark dark:border-dark-border">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-paper-dark dark:border-dark-border pb-8">
          <div>
            <div className="text-xs font-mono tracking-widest text-ink-muted dark:text-dark-muted uppercase mb-2">
              Creative Technology Lab
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-ink dark:text-dark-text uppercase">
              Playground
            </h2>
          </div>
          <div className="text-xs font-mono text-ink-muted dark:text-dark-muted">
            Interactive canvas physics & UI experiments
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PLAYGROUND_ITEMS.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onClick={() => setActiveItem(item)}
              onMouseEnter={() => onCursorChange('explore', 'TEST')}
              onMouseLeave={() => onCursorChange('default')}
              className="group cursor-pointer rounded-xl overflow-hidden border border-paper-dark dark:border-dark-border bg-paper-light dark:bg-dark-card p-6 space-y-4 hover:border-ink dark:hover:border-dark-text transition-colors"
            >
              <div className="flex items-center justify-between text-xs font-mono text-ink-muted dark:text-dark-muted">
                <span>{item.category}</span>
                <span>{item.year}</span>
              </div>

              <div className="aspect-video rounded-lg overflow-hidden border border-paper-dark dark:border-dark-border">
                <img
                  src={item.previewImage}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="space-y-1">
                <h3 className="text-lg font-bold text-ink dark:text-dark-text tracking-tight">
                  {item.title}
                </h3>
                <p className="text-xs font-light text-ink-muted dark:text-dark-muted leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Sandbox Modal */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-6"
            onClick={() => setActiveItem(null)}
          >
            <motion.div
              initial={{ scale: 0.96 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.96 }}
              className="bg-paper-light dark:bg-dark-bg border border-paper-dark dark:border-dark-border rounded-2xl max-w-3xl w-full p-6 space-y-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-paper-dark dark:border-dark-border pb-4">
                <h3 className="text-lg font-bold text-ink dark:text-dark-text tracking-tight">
                  {activeItem.title}
                </h3>
                <button onClick={() => setActiveItem(null)} className="p-1 text-ink dark:text-dark-text">
                  <X size={18} />
                </button>
              </div>

              <div className="relative rounded-xl overflow-hidden border border-paper-dark dark:border-dark-border bg-dark-bg min-h-[350px] flex items-center justify-center">
                {activeItem.type === 'particle' ? (
                  <canvas ref={canvasRef} className="w-full h-[350px] block cursor-crosshair" />
                ) : (
                  <img src={activeItem.previewImage} alt={activeItem.title} className="w-full h-56 object-cover rounded-lg" />
                )}
              </div>

              <div className="flex items-center justify-between text-xs font-mono text-ink-muted dark:text-dark-muted">
                <div>Move cursor over canvas to interact</div>
                <button onClick={() => setActiveItem(null)} className="px-4 py-2 rounded-full bg-ink dark:bg-dark-text text-paper-light dark:text-dark-bg font-bold">
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
