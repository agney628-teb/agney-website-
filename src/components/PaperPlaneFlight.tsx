'use client';

import React, { useEffect, useState, useRef } from 'react';

export default function PaperPlaneFlight() {
  const [planePos, setPlanePos] = useState({ x: 100, y: 300, angle: 45, progress: 0 });
  const svgPathRef = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const pathEl = svgPathRef.current;
      if (!pathEl) return;

      const totalLen = pathEl.getTotalLength();
      const docHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight
      ) - window.innerHeight;

      const scrollY = window.scrollY || window.pageYOffset || 0;
      const progress = Math.min(1, Math.max(0, scrollY / Math.max(1, docHeight)));

      const curDistance = progress * totalLen;
      const point = pathEl.getPointAtLength(curDistance);
      const nextPoint = pathEl.getPointAtLength(Math.min(totalLen, curDistance + 8));

      const angle = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * (180 / Math.PI);

      setPlanePos({ x: point.x, y: point.y, angle, progress });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div className="plane-fly pointer-events-none absolute inset-0 w-full h-full overflow-hidden z-20">
      <svg className="w-full h-full absolute inset-0 overflow-visible" viewBox="0 0 1440 6000" preserveAspectRatio="none">
        <path
          ref={svgPathRef}
          id="planeTrailPath"
          d="M 120,450 C -40,900 180,1200 1340,1500 C 1450,1900 120,2250 220,2800 C 350,3400 1380,3800 1200,4400 C 1000,5000 200,5300 720,5800"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeDasharray="8,10"
          className="text-neutral-900/25 dark:text-white/25 transition-colors"
        />
      </svg>

      {/* Coral 3D Paper Plane Sprite */}
      <div
        className="plane-sprite absolute w-14 h-14 flex items-center justify-center transition-transform duration-75 ease-out drop-shadow-2xl"
        style={{
          transform: `translate3d(${planePos.x}px, ${planePos.y}px, 0) translate(-50%, -50%) rotate(${planePos.angle}deg)`,
          opacity: planePos.progress > 0.005 && planePos.progress < 0.99 ? 1 : 0,
        }}
      >
        <svg viewBox="0 0 48 48" className="w-12 h-12 overflow-visible">
          <polygon points="4,24 44,4 28,44 22,28" fill="#fc9073" stroke="#e0694a" strokeWidth="1.5" />
          <polygon points="22,28 44,4 28,44" fill="#e8795c" />
          <polygon points="22,28 28,44 26,32" fill="#c95638" />
        </svg>
      </div>
    </div>
  );
}
