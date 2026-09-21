'use client';

import React, { useEffect, useState, useRef } from 'react';

export default function PaperPlaneFlight() {
  const [planePos, setPlanePos] = useState({ x: 210, y: 110, angle: 45, visible: false });
  const [dashOffset, setDashOffset] = useState(10000);
  const [totalPathLen, setTotalPathLen] = useState(10000);
  const motionPathRef = useRef<SVGPathElement | null>(null);

  // Smooth lerp state
  const currentPosRef = useRef({ x: 210, y: 110, angle: 45 });
  const targetPosRef = useRef({ x: 210, y: 110, angle: 45, visible: false, progress: 0 });

  // 1440 canvas path coordinate system matching reference design
  // Sweeps from top cloud seam -> down into story -> turns right -> loops across featured work -> weaves between staggered cards -> swoops down above testimonials
  const flightPathD = `M 210,120 C 110,240 70,390 95,490 C 115,570 210,615 285,645 C 490,725 820,740 1020,890 C 1190,1020 1230,1210 1120,1380 C 990,1580 620,1720 480,1920 C 340,2120 380,2380 540,2560 C 720,2760 1140,2920 1080,3240 C 1020,3560 620,3880 720,4320`;

  useEffect(() => {
    const motionEl = motionPathRef.current;
    if (motionEl) {
      const len = motionEl.getTotalLength();
      setTotalPathLen(len);
      setDashOffset(len);
    }

    const handleScroll = () => {
      const pathEl = motionPathRef.current;
      if (!pathEl) return;

      const totalLen = pathEl.getTotalLength();
      const docHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight
      ) - window.innerHeight;

      const scrollY = window.scrollY || window.pageYOffset || 0;
      // Normalised scroll progress across the entire page
      const progress = Math.min(1, Math.max(0, scrollY / Math.max(1, docHeight)));

      // Current distance along the curve
      const curDistance = progress * totalLen;
      const point = pathEl.getPointAtLength(curDistance);
      const nextPoint = pathEl.getPointAtLength(Math.min(totalLen, curDistance + 12));

      // Tangent angle
      const rawAngle = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * (180 / Math.PI);
      const angle = isNaN(rawAngle) ? 45 : rawAngle;

      // Plane is visible once scrolling begins
      const isVisible = progress > 0.008 && progress < 0.99;

      // Update mask dashoffset so trail draws exactly up to the rocket tail
      setDashOffset(Math.max(0, totalLen - curDistance + 10));

      targetPosRef.current = {
        x: point.x,
        y: point.y,
        angle,
        visible: isVisible,
        progress,
      };
    };

    // 60fps RAF smooth lerp
    let rafId: number;
    const animate = () => {
      const target = targetPosRef.current;
      const cur = currentPosRef.current;

      const lerp = 0.22;
      cur.x += (target.x - cur.x) * lerp;
      cur.y += (target.y - cur.y) * lerp;

      let angleDiff = (target.angle - cur.angle) % 360;
      if (angleDiff > 180) angleDiff -= 360;
      if (angleDiff < -180) angleDiff += 360;
      cur.angle += angleDiff * lerp;

      setPlanePos({
        x: cur.x,
        y: cur.y,
        angle: cur.angle,
        visible: target.visible,
      });

      rafId = requestAnimationFrame(animate);
    };

    handleScroll();
    rafId = requestAnimationFrame(animate);

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div className="plane-fly pointer-events-none absolute inset-0 w-full h-full overflow-hidden z-30" aria-hidden="true">
      {/* SVG Canvas for Motion Path and Dotted Masked Trail */}
      <svg
        className="plane-trail absolute inset-0 w-full h-full overflow-visible"
        viewBox="0 0 1440 4400"
        fill="none"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Mask that reveals the dotted line progressively as the rocket flies ahead */}
          <mask id="planeTrailMask">
            <path
              id="planeTrailMaskPath"
              fill="none"
              stroke="#ffffff"
              strokeWidth="48"
              strokeLinecap="round"
              strokeDasharray={totalPathLen}
              strokeDashoffset={dashOffset}
              d={flightPathD}
            />
          </mask>
        </defs>

        {/* Continuous geometry for coordinate calculation */}
        <path
          ref={motionPathRef}
          id="planeMotionPath"
          fill="none"
          stroke="none"
          d={flightPathD}
        />

        {/* Dotted Trail with SVG Masking from reference */}
        <path
          id="planeTrailPath"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="butt"
          strokeDasharray="10 7"
          mask="url(#planeTrailMask)"
          className="text-neutral-900/40 dark:text-amber-100/40 transition-colors"
          d={flightPathD}
        />
      </svg>

      {/* 3D Coral Origami Rocket / Plane Leading the Flight */}
      <div
        className="plane-sprite absolute w-14 h-14 flex items-center justify-center will-change-transform pointer-events-none"
        style={{
          left: `${(planePos.x / 1440) * 100}%`,
          top: `${planePos.y}px`,
          transform: `translate(-50%, -50%) rotate(${planePos.angle}deg)`,
          opacity: planePos.visible ? 1 : 0,
          transition: 'opacity 0.25s ease',
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
