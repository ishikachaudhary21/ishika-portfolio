import React, { useRef, useCallback } from 'react';

/*
  Lightweight 3D tilt wrapper — no library needed.
  Tilts children toward the cursor with a moving glare highlight.
  Disabled automatically for touch devices and reduced-motion users.
*/
const Tilt = ({ children, max = 8, className = '', style = {} }) => {
  const ref = useRef(null);
  const glareRef = useRef(null);
  const raf = useRef(null);

  const canTilt = () =>
    window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const onMove = useCallback((e) => {
    if (!canTilt() || !ref.current) return;
    const el = ref.current;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;   // 0..1
    const py = (e.clientY - rect.top) / rect.height;   // 0..1

    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      el.style.transform =
        `perspective(900px) rotateX(${(0.5 - py) * max}deg) rotateY(${(px - 0.5) * max}deg) translateZ(0)`;
      if (glareRef.current) {
        glareRef.current.style.opacity = '1';
        glareRef.current.style.background =
          `radial-gradient(420px circle at ${px * 100}% ${py * 100}%, rgba(255,255,255,0.10), transparent 55%)`;
      }
    });
  }, [max]);

  const onLeave = useCallback(() => {
    if (!ref.current) return;
    cancelAnimationFrame(raf.current);
    ref.current.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)';
    if (glareRef.current) glareRef.current.style.opacity = '0';
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      style={{ transition: 'transform .35s ease-out', transformStyle: 'preserve-3d', willChange: 'transform', ...style }}
    >
      {children}
      <div
        ref={glareRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{ opacity: 0, transition: 'opacity .3s ease', zIndex: 3 }}
      />
    </div>
  );
};

export default Tilt;
