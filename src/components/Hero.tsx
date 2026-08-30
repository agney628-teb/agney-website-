'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause } from 'lucide-react';

interface HeroProps {
  onCursorChange: (mode: 'default' | 'view' | 'explore' | 'play' | 'open', text?: string) => void;
}

export default function Hero({ onCursorChange }: HeroProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const totalDuration = 120; // 2:00

  const words = ['Codes', 'Builds', 'Ships', 'Solves'];
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);

  // Cycling words every 2.4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  // Timer counter when playing
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentTime((prev) => (prev >= totalDuration ? 0 : prev + 1));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, totalDuration]);

  // Audio synthesizer beat
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

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const splitLetters = (text: string) => {
    return text.split('').map((char, i) => (
      <span key={i} className="h-letter inline-block">
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  const progressPercent = Math.min(100, Math.max(0, (currentTime / totalDuration) * 100));

  return (
    <section className="hero-exact relative w-full h-screen min-h-[580px] select-none overflow-hidden flex flex-col justify-between">
      {/* Exact Day Mode Background Image */}
      <div className="hero-sky-day" />

      {/* Exact Dark Mode Background Image (x.png) */}
      <div className="hero-sky-dark" />

      {/* Shooting Star Meteor in Night Mode */}
      <div className="shooting-star" />

      {/* Compact Hatched Sun / Moon Circle Layered Over 'o' */}
      <div className="hatched-sun pointer-events-none">
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl overflow-visible">
          <defs>
            <pattern id="diagonalHatch" width="22" height="22" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="22" stroke="var(--sun-fill)" strokeWidth="11" />
            </pattern>
            <mask id="sunMask">
              <circle cx="100" cy="100" r="92" fill="white" />
            </mask>
          </defs>
          <circle cx="100" cy="100" r="92" fill="url(#diagonalHatch)" mask="url(#sunMask)" />
        </svg>
      </div>

      {/* Inner Content Container */}
      <div className="w-full h-full max-w-[1700px] mx-auto flex flex-col justify-between pt-16 pb-4 px-4 sm:px-8 lg:px-12 relative z-10">
        {/* Main Central Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-1 sm:gap-2 items-center my-auto w-full -translate-y-3 sm:-translate-y-5">
          {/* Far Left Vertical Rotated Label: DESIGN / DETAILS / CODE */}
          <div className="hidden md:flex md:col-span-1 items-center justify-start h-full">
            <div className="transform -rotate-90 origin-center whitespace-nowrap font-mono text-[10px] sm:text-[11px] tracking-[0.25em] text-white/80 uppercase">
              DESIGN / DETAILS / CODE
            </div>
          </div>

          {/* Core Display Area (11 columns) */}
          <div className="md:col-span-11 flex flex-col justify-center space-y-1 sm:space-y-2">
            {/* Eyebrow Tag: ● HELLO, I'M AGNEY. A — */}
            <div className="flex items-center gap-2 font-mono text-xs sm:text-sm tracking-wider uppercase text-white/95 font-semibold pb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ffda3f] shadow-[0_0_8px_#ffda3f]" />
              <span>HELLO, I&apos;M AGNEY. A —</span>
            </div>

            {/* ROW 1: "Designer who" */}
            <div className="relative z-10 flex items-baseline gap-x-4 sm:gap-x-10 text-[clamp(4.2rem,11.8vw,13.2rem)] dm-serif text-white tracking-tight leading-[0.82] drop-shadow-sm w-full">
              <span>{splitLetters('Designer')}</span>
              <span className="relative z-10">{splitLetters('who')}</span>
            </div>

            {/* ROW 2: [Neumorphic Music Player Pill] + [Rolling Word: Codes / Builds / Ships / Solves] */}
            <div className="relative z-20 flex flex-wrap items-center gap-4 sm:gap-8 lg:gap-10 pt-1">
              {/* Left Column of Row 2: Clean Neumorphic Dual-Dial Music Player Pill */}
              <div className="relative flex-shrink-0">
                <div
                  onMouseEnter={() => onCursorChange('play', isPlaying ? 'PAUSE' : 'PLAY')}
                  onMouseLeave={() => onCursorChange('default')}
                  className="player-pill-exact"
                >
                  {/* Left Recessed Well & Original Vinyl Speaker Dial */}
                  <div className="dial-well">
                    <div className={`dial-disc ${isPlaying ? 'spin-dial' : ''}`}>
                      <div className="dial-center-dot" />
                    </div>
                  </div>

                  {/* Center Player HUD matching reference image */}
                  <div className="flex flex-col items-center justify-center gap-1.5 px-3 sm:px-5 min-w-[170px] sm:min-w-[215px]">
                    {/* Track Title */}
                    <div className="font-mono text-[12px] sm:text-[13px] text-[#2c2822] tracking-normal font-normal text-center">
                      My design journey, rapped
                    </div>

                    {/* Recessed Slider Trench with Glowing Yellow Active Progress Line & Pearl Knob */}
                    <div
                      onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const clickX = e.clientX - rect.left;
                        const pct = Math.max(0, Math.min(1, clickX / rect.width));
                        setCurrentTime(Math.floor(pct * totalDuration));
                      }}
                      className="slider-trench my-0.5"
                    >
                      {/* Glowing Yellow Active Music Progress Line */}
                      <div
                        className="slider-progress-yellow"
                        style={{ width: `${progressPercent}%` }}
                      />

                      {/* 3D Pearl Knob Thumb */}
                      <div
                        className="slider-pearl-knob"
                        style={{ left: `${progressPercent}%` }}
                      />
                    </div>

                    {/* Timestamps */}
                    <div className="w-full flex items-center justify-between font-mono text-[11px] sm:text-[12px] text-[#332f28] font-normal px-0.5">
                      <span>{formatTime(currentTime)}</span>
                      <span>2:00</span>
                    </div>

                    {/* Warm Dark Bronze Play Button */}
                    <button
                      onClick={togglePlay}
                      className="player-play-btn mt-0.5"
                      aria-label="Toggle Play"
                    >
                      {isPlaying ? (
                        <Pause size={14} className="fill-current text-white" />
                      ) : (
                        <Play size={14} className="ml-0.5 fill-current text-white" />
                      )}
                    </button>
                  </div>

                  {/* Right Recessed Well & Original Vinyl Speaker Dial */}
                  <div className="dial-well">
                    <div className={`dial-disc ${isPlaying ? 'spin-dial' : ''}`}>
                      <div className="dial-center-dot" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column of Row 2: Dynamic Rolling Word */}
              <div className="relative min-w-[280px] sm:min-w-[380px] lg:min-w-[480px] h-[1.12em] overflow-hidden text-[clamp(4.2rem,11.8vw,13.2rem)] dm-serif text-white tracking-tight leading-[0.82] drop-shadow-sm flex items-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={words[wordIndex]}
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{ y: '0%', opacity: 1 }}
                    exit={{ y: '-100%', opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 flex items-center whitespace-nowrap"
                  >
                    {splitLetters(words[wordIndex])}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Empty bottom spacer */}
        <div className="h-1" />
      </div>

      {/* Bottom Organic Wave Curve */}
      <div className="hero-bottom-wave">
        <svg viewBox="0 0 1440 160" preserveAspectRatio="none" className="w-full h-full text-[var(--bg-base)] fill-current">
          <path d="M0,60 C320,140 480,20 800,100 C1120,180 1280,40 1440,80 L1440,160 L0,160 Z" />
        </svg>
      </div>
    </section>
  );
}
