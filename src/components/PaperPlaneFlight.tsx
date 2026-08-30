'use client';

import React, { useEffect, useState, useRef } from 'react';

export default function PaperPlaneFlight() {
  const [planePos, setPlanePos] = useState({ x: 80, y: 350, angle: 45, visible: false });
  const [windowWidth, setWindowWidth] = useState(1440);
  const [trailPathD, setTrailPathD] = useState('');
  const masterPathRef = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    const updateDimensions = () => {
      setWindowWidth(window.innerWidth || 1440);
    };

    const handleScroll = () => {
      const pathEl = masterPathRef.current;
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

      // Current distance of the rocket ahead
      const curDistance = progress * totalLen;
      const point = pathEl.getPointAtLength(curDistance);
      const nextPoint = pathEl.getPointAtLength(Math.min(totalLen, curDistance + 14));

      // Rocket tangent angle
      const angle = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * (180 / Math.PI);

      // Rocket moves 1st, visible after slight initial scroll
      const isVisible = progress > 0.005 && progress < 0.995;

      // Trailing path calculation: path appears dynamically behind the rocket
      const trailLength = 650;
      const trailStartDist = Math.max(0, curDistance - trailLength);
      const trailEndDist = Math.max(0, curDistance - 15); // Behind rocket tail

      if (trailEndDist > trailStartDist + 25 && isVisible) {
        const steps = 30;
        const stepSize = (trailEndDist - trailStartDist) / steps;
        let d = '';

        for (let i = 0; i <= steps; i++) {
          const dPos = trailStartDist + i * stepSize;

          // Natural flight path gaps
          const inGap1 = dPos > totalLen * 0.28 && dPos < totalLen * 0.33;
          const inGap2 = dPos > totalLen * 0.58 && dPos < totalLen * 0.62;

          if (inGap1 || inGap2) {
            continue;
          }

          const pt = pathEl.getPointAtLength(dPos);
          if (d === '') {
            d += `M ${pt.x.toFixed(1)},${pt.y.toFixed(1)} `;
          } else {
            d += `L ${pt.x.toFixed(1)},${pt.y.toFixed(1)} `;
          }
        }
        setTrailPathD(d);
      } else {
        setTrailPathD('');
      }

      setPlanePos({
        x: point.x,
        y: point.y,
        angle: isNaN(angle) ? 45 : angle,
        visible: isVisible,
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

  // Multi-loop trajectory weaving through hero, narrative, between project cards, and into testimonials
  const masterPathD = `M 0,260 C ${windowWidth * 0.12},480 ${windowWidth * 0.02},700 ${windowWidth * 0.48},780 C ${windowWidth * 0.88},850 ${windowWidth * 0.98},1080 ${windowWidth * 0.12},1280 C ${windowWidth * 0.02},1550 ${windowWidth * 0.45},1780 ${windowWidth * 0.55},1950 C ${windowWidth * 0.95},2180 ${windowWidth * 0.92},2500 ${windowWidth * 0.15},2750 C ${windowWidth * 0.05},3050 ${windowWidth * 0.88},3280 ${windowWidth * 0.85},3600 C ${windowWidth * 0.65},4050 ${windowWidth * 0.25},4400 ${windowWidth * 0.5},4850`;

  return (
    <div className="plane-fly pointer-events-none absolute inset-0 w-full h-full overflow-hidden z-30">
      {/* Hidden Master Path Reference */}
      <svg
        className="w-full h-full absolute inset-0 overflow-visible opacity-0 pointer-events-none"
        viewBox={`0 0 ${windowWidth} 5000`}
        preserveAspectRatio="none"
      >
        <path
          ref={masterPathRef}
          id="planeTrailMaster"
          d={masterPathD}
          fill="none"
        />
      </svg>

      {/* Dynamic Dotted Trail that Appears BEHIND Rocket and Hides at gaps */}
      <svg
        className="w-full h-full absolute inset-0 overflow-visible"
        viewBox={`0 0 ${windowWidth} 5000`}
        preserveAspectRatio="none"
      >
        {trailPathD && (
          <path
            d={trailPathD}
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeDasharray="6,8"
            className="text-neutral-900/30 dark:text-white/30 transition-colors"
          />
        )}
      </svg>

      {/* 3D Coral Origami Rocket / Plane Leading the Flight */}
      <div
        className="plane-sprite absolute w-14 h-14 flex items-center justify-center will-change-transform"
        style={{
          transform: `translate3d(${planePos.x}px, ${planePos.y}px, 0) translate(-50%, -50%) rotate(${planePos.angle}deg)`,
          opacity: planePos.visible ? 1 : 0,
          transition: 'opacity 0.25s ease, transform 0.08s linear',
        }}
      >
        <svg viewBox="0 0 52 52" className="w-12 h-12 overflow-visible drop-shadow-2xl">
          {/* Main Left Wing */}
          <polygon points="4,26 48,4 30,48 24,30" fill="#fc9073" stroke="#e0694a" strokeWidth="1.2" />
          {/* Main Right Wing Fold */}
          <polygon points="24,30 48,4 30,48" fill="#e8795c" />
          {/* Center Keel Fold */}
          <polygon points="24,30 30,48 28,34" fill="#cf5b3d" />
          {/* Cockpit Highlight */}
          <polygon points="48,4 38,15 32,24 24,30" fill="rgba(255,255,255,0.3)" />
        </svg>
      </div>
    </div>
  );
}
