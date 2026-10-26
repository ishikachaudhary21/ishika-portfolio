import React, { useEffect, useRef, useState } from 'react';

/*
  "Pixel" — original chibi anime mascot (pure SVG, no external assets).
  - Eyes track the cursor
  - Blinks and bobs on a loop
  - Speech bubble narrates whichever section is on screen
  - Click the × to dismiss for the session
  Desktop-only: hidden below md to keep mobile clean.
*/
const LINES = {
  home: 'Konnichiwa! I’m Pixel ✦ Ishika’s AI companion. Scroll with me!',
  about: 'That’s my creator! She trains YOLO models and ships them to production.',
  expertise: 'AI vision, backends, mobile apps — full-stack, full power.',
  skills: 'Power levels: Python 95. Almost over 9000!',
  projects: 'Watch CAM 01 ▸ her PPE system monitors factories 24×7!',
  contact: 'Say hello! She replies faster than her REST APIs ⚡',
};

const Mascot = () => {
  const [visible, setVisible] = useState(true);
  const [line, setLine] = useState(LINES.home);
  const [blink, setBlink] = useState(false);
  const pupilsRef = useRef(null);
  const wrapRef = useRef(null);

  // eyes follow the cursor
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    let raf;
    const onMove = (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (!wrapRef.current || !pupilsRef.current) return;
        const r = wrapRef.current.getBoundingClientRect();
        const cx = r.left + r.width / 2, cy = r.top + r.height * 0.38;
        const a = Math.atan2(e.clientY - cy, e.clientX - cx);
        const d = Math.min(2.6, Math.hypot(e.clientX - cx, e.clientY - cy) / 60);
        pupilsRef.current.style.transform = `translate(${Math.cos(a) * d}px, ${Math.sin(a) * d}px)`;
      });
    };
    window.addEventListener('mousemove', onMove);
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf); };
  }, []);

  // blink loop
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let t1, t2;
    const loop = () => {
      t1 = setTimeout(() => {
        setBlink(true);
        t2 = setTimeout(() => { setBlink(false); loop(); }, 140);
      }, 2400 + Math.random() * 2600);
    };
    loop();
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // narrate the section currently on screen
  useEffect(() => {
    const ids = Object.keys(LINES);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => { if (en.isIntersecting) setLine(LINES[en.target.id]); }),
      { threshold: 0.45 }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);

  if (!visible) return null;

  return (
    <div ref={wrapRef} className="fixed bottom-5 right-5 z-40 hidden md:flex flex-col items-end gap-2 select-none animate-float" style={{ width: 210 }}>
      {/* speech bubble */}
      <div className="relative rounded-xl px-3.5 py-2.5 text-[11px] leading-snug"
        style={{ background: 'var(--panel-2)', border: '1px solid var(--line-2)', color: 'var(--text-dim)', boxShadow: '0 0 24px rgba(139,92,246,.25)' }}>
        <button onClick={() => setVisible(false)} aria-label="Dismiss mascot"
          className="absolute -top-2 -right-2 w-5 h-5 rounded-full text-[10px] leading-none cursor-pointer"
          style={{ background: 'var(--panel)', border: '1px solid var(--line-2)', color: 'var(--text-mute)' }}>×</button>
        {line}
        <span className="absolute -bottom-[7px] right-8 w-3 h-3 rotate-45" style={{ background: 'var(--panel-2)', borderRight: '1px solid var(--line-2)', borderBottom: '1px solid var(--line-2)' }} />
      </div>

      {/* chibi character */}
      <svg width="92" height="104" viewBox="0 0 92 104" aria-hidden="true" style={{ filter: 'drop-shadow(0 0 14px rgba(45,226,230,.35))' }}>
        {/* ponytail */}
        <path d="M70 26 Q88 30 84 56 Q82 70 72 76 Q78 58 70 44 Z" fill="#241f3a" stroke="#8b5cf6" strokeWidth="1.2" />
        {/* head */}
        <circle cx="44" cy="34" r="26" fill="#171525" stroke="#2de2e6" strokeWidth="1.4" />
        {/* hair fringe */}
        <path d="M18 32 Q16 8 44 8 Q72 8 70 32 Q62 20 52 22 Q56 14 46 16 Q34 18 32 26 Q28 18 22 24 Q19 27 18 32 Z" fill="#241f3a" stroke="#8b5cf6" strokeWidth="1.2" />
        {/* headphones */}
        <rect x="12" y="28" width="7" height="14" rx="3.5" fill="#0b0a14" stroke="#ff3cac" strokeWidth="1.4" />
        <rect x="69" y="28" width="7" height="14" rx="3.5" fill="#0b0a14" stroke="#ff3cac" strokeWidth="1.4" />
        <path d="M15 28 Q44 2 73 28" fill="none" stroke="#ff3cac" strokeWidth="2" />
        {/* eyes */}
        {blink ? (
          <g stroke="#edecf6" strokeWidth="2" strokeLinecap="round">
            <line x1="30" y1="38" x2="40" y2="38" />
            <line x1="50" y1="38" x2="60" y2="38" />
          </g>
        ) : (
          <g>
            <ellipse cx="35" cy="38" rx="6" ry="7.5" fill="#edecf6" />
            <ellipse cx="55" cy="38" rx="6" ry="7.5" fill="#edecf6" />
            <g ref={pupilsRef}>
              <circle cx="35" cy="39" r="3.2" fill="#0b0a14" />
              <circle cx="55" cy="39" r="3.2" fill="#0b0a14" />
              <circle cx="36.2" cy="37.6" r="1.1" fill="#2de2e6" />
              <circle cx="56.2" cy="37.6" r="1.1" fill="#2de2e6" />
            </g>
          </g>
        )}
        {/* blush + smile */}
        <ellipse cx="28" cy="46" rx="3.4" ry="1.8" fill="rgba(255,60,172,.45)" />
        <ellipse cx="62" cy="46" rx="3.4" ry="1.8" fill="rgba(255,60,172,.45)" />
        <path d="M40 50 Q45 54 50 50" fill="none" stroke="#edecf6" strokeWidth="1.6" strokeLinecap="round" />
        {/* body */}
        <path d="M30 60 Q30 56 44 56 Q58 56 58 60 L60 84 Q44 90 28 84 Z" fill="#12111e" stroke="#2de2e6" strokeWidth="1.3" />
        {/* laptop */}
        <rect x="30" y="74" width="28" height="4" rx="1.5" fill="#0b0a14" stroke="#8b5cf6" strokeWidth="1" />
        <rect x="33" y="62" width="22" height="13" rx="2" fill="#0b0a14" stroke="#8b5cf6" strokeWidth="1.2" />
        <text x="44" y="71.5" textAnchor="middle" fontSize="7" fill="#2de2e6" fontFamily="monospace">&lt;/&gt;</text>
        {/* legs */}
        <path d="M34 86 L33 98 M54 86 L55 98" stroke="#241f3a" strokeWidth="5" strokeLinecap="round" />
      </svg>
    </div>
  );
};

export default Mascot;
