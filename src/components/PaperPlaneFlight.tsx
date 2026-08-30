'use client';

import React, { useEffect, useState, useRef } from 'react';

export default function PaperPlaneFlight() {
  const [planePos, setPlanePos] = useState({ x: 80, y: 350, angle: 45, visible: true });
  const [windowWidth, setWindowWidth] = useState(1440);
  const svgPathRef = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    const updateDimensions = () => {
      setWindowWidth(window.innerWidth || 1440);
    };

    const handleScroll = () => {
      const pathEl = svgPathRef.current;
      if (!pathEl) return;

      const totalLen = pathEl.getTotalLength();
      const docHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight
      ) - window.innerHeight;

      const scrollY = window.scrollY || window.pageYOffset || 0;
      const progress = Math.min(1, Math.max(0, scrollY / Math.max(1, docHeight)));

      // Map progress to distance along path
      const curDistance = progress * totalLen;
      const point = pathEl.getPointAtLength(curDistance);
      const nextPoint = pathEl.getPointAtLength(Math.min(totalLen, curDistance + 12));

      // Calculate tangent angle
      const angle = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * (180 / Math.PI);

      setPlanePos({
        x: point.x,
        y: point.y,
        angle: isNaN(angle) ? 45 : angle,
        visible: progress >= 0.005 && progress <= 0.995,
      });
    };

    updateDimensions();
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', () => {
      updateDimensions();
      handleScroll();
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  return (
    <div className="plane-fly pointer-events-none absolute inset-0 w-full h-full overflow-hidden z-30">
      <svg
        className="w-full h-full absolute inset-0 overflow-visible"
        viewBox={`0 0 ${windowWidth} 5500`}
        preserveAspectRatio="none"
      >
        <path
          ref={svgPathRef}
          id="planeTrailPath"
          d={`M 0,280 C ${windowWidth * 0.15},500 ${windowWidth * 0.05},750 ${windowWidth * 0.45},820 C ${windowWidth * 0.85},890 ${windowWidth * 0.95},1200 ${windowWidth * 0.75},1550 C ${windowWidth * 0.5},1900 ${windowWidth * 0.1},2200 ${windowWidth * 0.25},2650 C ${windowWidth * 0.4},3100 ${windowWidth * 0.9},3400 ${windowWidth * 0.75},3900 C ${windowWidth * 0.6},4400 ${windowWidth * 0.15},4800 ${windowWidth * 0.5},5300`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="6,8"
          className="text-neutral-900/25 dark:text-white/25 transition-colors"
        />
      </svg>

      {/* 3D Coral Origami Paper Plane / Rocket with Motion Tilt */}
      <div
        className="plane-sprite absolute w-14 h-14 flex items-center justify-center will-change-transform"
        style={{
          transform: `translate3d(${planePos.x}px, ${planePos.y}px, 0) translate(-50%, -50%) rotate(${planePos.angle}deg)`,
          opacity: planePos.visible ? 1 : 0,
          transition: 'opacity 0.3s ease, transform 0.08s linear',
        }}
      >
        <svg viewBox="0 0 52 52" className="w-12 h-12 overflow-visible drop-shadow-xl">
          {/* Main Left Wing */}
          <polygon points="4,26 48,4 30,48 24,30" fill="#fc9073" stroke="#e0694a" strokeWidth="1.2" />
          {/* Main Right Wing Fold */}
          <polygon points="24,30 48,4 30,48" fill="#e8795c" />
          {/* Center Keel Fold */}
          <polygon points="24,30 30,48 28,34" fill="#cf5b3d" />
          {/* Cockpit / Nose highlight */}
          <polygon points="48,4 38,15 32,24 24,30" fill="rgba(255,255,255,0.25)" />
        </svg>
      </div>
    </div>
  );
}
