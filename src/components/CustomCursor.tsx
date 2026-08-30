'use client';

import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export type CursorMode = 'default' | 'view' | 'explore' | 'play' | 'open' | 'hidden';

interface CustomCursorProps {
  cursorMode: CursorMode;
  cursorText?: string;
}

export default function CustomCursor({ cursorMode, cursorText }: CustomCursorProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check if touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }

    document.body.classList.add('has-custom-cursor');

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.body.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (isTouch || !isVisible || cursorMode === 'hidden') return null;

  const getCursorStyles = () => {
    switch (cursorMode) {
      case 'view':
        return {
          width: 80,
          height: 80,
          backgroundColor: '#FF3B00',
          color: '#FFFFFF',
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '0.1em',
          text: cursorText || 'VIEW',
          borderRadius: '50%',
        };
      case 'explore':
        return {
          width: 90,
          height: 38,
          backgroundColor: '#00F0FF',
          color: '#0A0A0C',
          fontSize: '11px',
          fontWeight: 800,
          letterSpacing: '0.12em',
          text: cursorText || 'EXPLORE',
          borderRadius: '20px',
        };
      case 'play':
        return {
          width: 82,
          height: 82,
          backgroundColor: '#111111',
          color: '#FFFFFF',
          fontSize: '9px',
          fontWeight: 800,
          letterSpacing: '0.08em',
          text: cursorText || 'PRESS\nPLAY\nSTRANGER',
          borderRadius: '50%',
          border: '2px solid rgba(255,255,255,0.85)',
          whiteSpace: 'pre-line',
          lineHeight: '1.2',
        };
      case 'open':
        return {
          width: 84,
          height: 36,
          backgroundColor: '#0E0E10',
          color: '#FFFFFF',
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '0.08em',
          text: cursorText || 'OPEN ↗',
          borderRadius: '18px',
        };
      default:
        return {
          width: 14,
          height: 14,
          backgroundColor: '#FF3B00',
          color: 'transparent',
          text: '',
          borderRadius: '50%',
        };
    }
  };

  const style = getCursorStyles();

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center font-mono shadow-2xl transition-colors duration-200"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: '-50%',
        translateY: '-50%',
        width: style.width,
        height: style.height,
        backgroundColor: style.backgroundColor,
        color: style.color,
        fontSize: style.fontSize,
        fontWeight: style.fontWeight,
        letterSpacing: style.letterSpacing,
        borderRadius: style.borderRadius,
        border: style.border || 'none',
      }}
    >
      {style.text}
    </motion.div>
  );
}
