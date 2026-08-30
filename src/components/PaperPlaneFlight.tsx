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
      const nextPoint = pathEl.getPointAtLength(Math.min(totalLen, curDistance + 12));

      // Rocket tangent angle
      const angle = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * (180 / Math.PI);

      // Rocket moves 1st, visible after slight scroll
      const isVisible = progress > 0.008 && progress < 0.995;

      // Trailing path calculation: path appears behind the rocket and hides in sections
      // Trail length is ~500px trailing behind the plane
      const trailLength = 550;
      const trailStartDist = Math.max(0, curDistance - trailLength);
      const trailEndDist = Math.max(0, curDistance - 15); // Behind the rocket tail

      if (trailEndDist > trailStartDist + 20 && isVisible) {
        // Build trailing subpath points
        const steps = 24;
        const stepSize = (trailEndDist - trailStartDist) / steps;
        let d = '';

        for (let i = 0; i <= steps; i++) {
          const dPos = trailStartDist + i * stepSize;
          
          // Hide path at specific zones (e.g. gaps in flight)
          const inGap1 = dPos > totalLen * 0.32 && dPos < totalLen * 0.38;
          const inGap2 = dPos > totalLen * 0.62 && dPos < totalLen * 0.67;
          
          if (inGap1 || inGap2) {
            // Gap / Hidden section
            continue;
          }

          const pt = pathEl.getPointAtLength(dPos);
          if (d === '' || inGap1 || inGap2) {
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

  const masterPathD = `M 0,280 C ${windowWidth * 0.15},500 ${windowWidth * 0.05},750 ${windowWidth * 0.45},820 C ${windowWidth * 0.85},890 ${windowWidth * 0.95},1200 ${windowWidth * 0.75},1550 C ${windowWidth * 0.5},1900 ${windowWidth * 0.1},2200 ${windowWidth * 0.25},2650 C ${windowWidth * 0.4},3100 ${windowWidth * 0.9},3400 ${windowWidth * 0.75},3900 C ${windowWidth * 0.6},4400 ${windowWidth * 0.15},4800 ${windowWidth * 0.5},5300`;

  return (
    <div className="plane-fly pointer-events-none absolute inset-0 w-full h-full overflow-hidden z-30">
      {/* Hidden Master Path Reference */}
      <svg
        className="w-full h-full absolute inset-0 overflow-visible opacity-0 pointer-events-none"
        viewBox={`0 0 ${windowWidth} 5500`}
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
        viewBox={`0 0 ${windowWidth} 5500`}
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
