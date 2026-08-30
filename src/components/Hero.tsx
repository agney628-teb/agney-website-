'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { PERSONAL_INFO } from '@/data/portfolioData';
import { Play, Pause, Volume2, Sparkles, ArrowDownRight, Compass } from 'lucide-react';

interface HeroProps {
  onCursorChange: (mode: 'default' | 'view' | 'explore' | 'play' | 'open', text?: string) => void;
}

export default function Hero({ onCursorChange }: HeroProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(30);

  // 3D Spatial Mouse Coordinates
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const words = ['BUILDS.', 'CREATES.', 'INNOVATES.', 'CO-FOUNDS.'];

  // Handle 3D Mouse Parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2; // -1 to 1
      const y = (e.clientY / innerHeight - 0.5) * 2; // -1 to 1

      setTilt({
        rotateX: -y * 12,
        rotateY: x * 14,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Ambient 3D Node Mesh Background
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const nodes: { x: number; y: number; z: number; vx: number; vy: number }[] = [];
    for (let i = 0; i < 70; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 2 + 0.5,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      nodes.forEach((node, i) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.z * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 55, ${0.15 * node.z})`;
        ctx.fill();

        // Draw connections
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const dx = other.x - node.x;
          const dy = other.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(212, 175, 55, ${(1 - dist / 130) * 0.08})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      animId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Vertical word rolling interval
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const togglePlay = async () => {
    if (!isPlaying) {
      try {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        let ctx = audioContextRef.current;
        if (!ctx) {
          ctx = new AudioContextClass();
          audioContextRef.current = ctx;
        }

        if (ctx.state === 'suspended') {
          await ctx.resume();
        }

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(140, ctx.currentTime);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        oscillatorRef.current = osc;
      } catch (e) {
        console.log('AudioContext error', e);
      }
      setIsPlaying(true);
    } else {
      if (oscillatorRef.current) {
        try {
          oscillatorRef.current.stop();
        } catch (e) {
          // ignore
        }
      }
      setIsPlaying(false);
    }
  };

  const splitText3D = (text: string) => {
    return text.split('').map((char, index) => (
      <span key={index} className="h-3d-letter">
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <section className="hero-sticky flex flex-col justify-between pt-32 pb-16 px-6 md:px-12 max-w-7xl mx-auto border-b border-paper-dark dark:border-dark-border perspective-container relative select-none">
      <div className="hero-noise-layer" />

      {/* 3D Canvas Ambient Node Layer */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />

      {/* Status Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-ink-muted dark:text-dark-muted relative z-10 border-b border-paper-dark dark:border-dark-border pb-6"
      >
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>{PERSONAL_INFO.location}</span>
        </div>

        <div className="flex items-center gap-2 font-bold uppercase tracking-widest text-ink dark:text-dark-text">
          <Compass size={14} className="text-amber-500 animate-spin" />
          <span>{PERSONAL_INFO.availability}</span>
        </div>
      </motion.div>

      {/* Interactive 3D Display Headline */}
      <div
        className="relative z-10 space-y-4 py-8 text-3d-title"
        style={{
          transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl sm:text-8xl md:text-[130px] lg:text-[150px] h-serif tracking-tight text-ink dark:text-dark-text select-none text-3d-layer-front"
        >
          {splitText3D('Multidisciplinary')}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap items-baseline gap-x-6 gap-y-2 text-4xl sm:text-7xl md:text-[110px] h-serif tracking-tight text-ink dark:text-dark-text text-3d-layer-front"
        >
          <span>Designer Who</span>

          {/* Rolling Word Animator */}
          <div className="roll-container font-sans font-black uppercase text-accent">
            <div
              className="roll-track"
              style={{ transform: `translateY(-${wordIndex * 25}%)` }}
            >
              {words.map((w, idx) => (
                <div key={idx} className="h-[1.1em] flex items-center">
                  {w}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* 3D Spatially Tilted Audio Player Pill & Narrative */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end relative z-10 pt-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="md:col-span-6 space-y-4"
        >
          <p className="text-lg sm:text-2xl font-light text-ink-muted dark:text-dark-muted leading-relaxed">
            {PERSONAL_INFO.subheadline}
          </p>
        </motion.div>

        {/* 3D Tilted Vinyl Player Pill */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="md:col-span-6 flex justify-start md:justify-end"
          style={{
            transform: `rotateX(${-tilt.rotateX * 0.5}deg) rotateY(${-tilt.rotateY * 0.5}deg) translateZ(30px)`,
          }}
        >
          <div
            onMouseEnter={() => onCursorChange('play', isPlaying ? 'PAUSE' : 'PLAY')}
            onMouseLeave={() => onCursorChange('default')}
            className="recorder-pill shadow-2xl"
          >
            {/* Spinning 3D Vinyl Disc */}
            <div className={`w-14 h-14 rounded-full border-2 border-black/40 bg-black relative flex items-center justify-center overflow-hidden flex-shrink-0 ${isPlaying ? 'disk-spin' : ''}`}>
              <div className="w-5 h-5 rounded-full bg-amber-400 border border-black flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-black" />
              </div>
            </div>

            {/* Audio Scrubber */}
            <div className="space-y-1 font-mono text-xs">
              <div className="font-bold flex items-center gap-2">
                <span>AGNEY SOUND REEL 2026</span>
                <Volume2 size={13} className={isPlaying ? 'text-accent animate-pulse' : 'text-gray-400'} />
              </div>

              <div
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  const newPct = Math.round((clickX / rect.width) * 100);
                  setProgress(newPct);
                }}
                className="w-48 sm:w-56 h-2 rounded-full bg-black/20 dark:bg-white/20 relative cursor-pointer overflow-hidden"
              >
                <div
                  className="h-full bg-accent transition-all duration-200"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[10px] opacity-70">
                <span>00:14</span>
                <span>01:24</span>
              </div>
            </div>

            <button
              onClick={togglePlay}
              className="w-10 h-10 rounded-full bg-ink dark:bg-dark-text text-paper-light dark:text-dark-bg flex items-center justify-center hover:scale-105 transition-transform"
              aria-label="Toggle Play"
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
            </button>
          </div>
        </motion.div>
      </div>

      {/* Footer hint */}
      <div className="pt-8 flex items-center justify-between font-mono text-xs text-ink-muted dark:text-dark-muted relative z-10">
        <div className="flex items-center gap-2">
          <ArrowDownRight size={14} className="text-accent animate-bounce" />
          <span>MOVE CURSOR FOR 3D PERSPECTIVE TILT</span>
        </div>
        <div>2026 3D EDITION</div>
      </div>
    </section>
  );
}
