'use client';

import React, { useEffect, useState, useRef } from 'react';

export default function PaperPlaneFlight() {
  const [planePos, setPlanePos] = useState({ x: 80, y: 350, angle: 45, visible: false });
  const [windowWidth, setWindowWidth] = useState(1440);
  const [trailPathD, setTrailPathD] = useState('');
  const masterPathRef = useRef<SVGPathElement | null>(null);

  // Smooth lerp state
  const currentPosRef = useRef({ x: 80, y: 350, angle: 45 });
  const targetPosRef = useRef({ x: 80, y: 350, angle: 45, visible: false, curDist: 0, totalLen: 1000 });

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
      const nextPoint = pathEl.getPointAtLength(Math.min(totalLen, curDistance + 16));

      // Calculate tangent angle with continuous angular unwrapping
      const rawAngle = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * (180 / Math.PI);
      const angle = isNaN(rawAngle) ? 45 : rawAngle;

      const isVisible = progress > 0.005 && progress < 0.995;

      targetPosRef.current = {
        x: point.x,
        y: point.y,
        angle,
        visible: isVisible,
        curDist: curDistance,
        totalLen,
      };

      // Trailing path calculation: path appears dynamically behind the rocket
      const trailLength = 700;
      const trailStartDist = Math.max(0, curDistance - trailLength);
      const trailEndDist = Math.max(0, curDistance - 18); // Behind rocket tail

      if (trailEndDist > trailStartDist + 20 && isVisible) {
        const steps = 36;
        const stepSize = (trailEndDist - trailStartDist) / steps;
        let d = '';

        for (let i = 0; i <= steps; i++) {
          const dPos = trailStartDist + i * stepSize;

          // Natural flight path gaps
          const inGap1 = dPos > totalLen * 0.29 && dPos < totalLen * 0.34;
          const inGap2 = dPos > totalLen * 0.60 && dPos < totalLen * 0.64;

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
    };

    // Smooth RAF loop for continuous smooth motion
    let rafId: number;
    const animate = () => {
      const target = targetPosRef.current;
      const cur = currentPosRef.current;

      // Smooth lerp interpolation
      const lerpFactor = 0.25;
      cur.x += (target.x - cur.x) * lerpFactor;
      cur.y += (target.y - cur.y) * lerpFactor;

      // Handle angle lerp across 360 wrap
      let angleDiff = (target.angle - cur.angle) % 360;
      if (angleDiff > 180) angleDiff -= 360;
      if (angleDiff < -180) angleDiff += 360;
      cur.angle += angleDiff * lerpFactor;

      setPlanePos({
        x: cur.x,
        y: cur.y,
        angle: cur.angle,
        visible: target.visible,
      });

      rafId = requestAnimationFrame(animate);
    };

    updateDimensions();
    handleScroll();
    rafId = requestAnimationFrame(animate);

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', () => {
      updateDimensions();
      handleScroll();
    });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  // Precise flight path geometry matching reference video
  const w = windowWidth;
  const masterPathD = `M 0,280 C ${w * 0.12},480 ${w * 0.04},680 ${w * 0.42},760 C ${w * 0.82},830 ${w * 0.96},1050 ${w * 0.16},1240 C ${w * 0.02},1480 ${w * 0.48},1720 ${w * 0.54},1920 C ${w * 0.94},2140 ${w * 0.92},2460 ${w * 0.18},2700 C ${w * 0.06},3000 ${w * 0.85},3220 ${w * 0.82},3540 C ${w * 0.65},3980 ${w * 0.28},4320 ${w * 0.5},4780`;

  return (
    <div className="plane-fly pointer-events-none absolute inset-0 w-full h-full overflow-hidden z-30">
      {/* Hidden Master Path Reference */}
      <svg
        className="w-full h-full absolute inset-0 overflow-visible opacity-0 pointer-events-none"
        viewBox={`0 0 ${w} 5000`}
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
        viewBox={`0 0 ${w} 5000`}
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
        className="plane-sprite absolute w-14 h-14 flex items-center justify-center will-change-transform pointer-events-none"
        style={{
          transform: `translate3d(${planePos.x}px, ${planePos.y}px, 0) translate(-50%, -50%) rotate(${planePos.angle}deg)`,
          opacity: planePos.visible ? 1 : 0,
          transition: 'opacity 0.2s ease',
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
