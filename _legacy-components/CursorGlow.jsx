import React, { useEffect, useRef } from 'react';

/*
  Soft neon glow that trails the cursor (desktop only).
  Pure transform updates on rAF — no layout thrash.
*/
const CursorGlow = () => {
  const ref = useRef(null);

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let x = -200, y = -200, cx = -200, cy = -200, raf;
    const onMove = (e) => { x = e.clientX; y = e.clientY; };
    const loop = () => {
      cx += (x - cx) * 0.12;
      cy += (y - cy) * 0.12;
      if (ref.current) ref.current.style.transform = `translate3d(${cx - 160}px, ${cy - 160}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener('mousemove', onMove);
    loop();
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf); };
  }, []);

  return (
    <div ref={ref} aria-hidden="true"
      className="fixed top-0 left-0 pointer-events-none hidden md:block"
      style={{
        width: 320, height: 320, zIndex: 40, mixBlendMode: 'screen',
        background: 'radial-gradient(circle, rgba(45,226,230,.10) 0%, rgba(255,60,172,.06) 40%, transparent 70%)',
        transform: 'translate3d(-200px,-200px,0)', willChange: 'transform',
      }}
    />
  );
};

export default CursorGlow;
