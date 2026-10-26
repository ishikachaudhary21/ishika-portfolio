import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiLinkedin } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

/*
 * Reference-style pinned hero: a pre-rendered rotation (public/hero-frames/)
 * plays a short "boot" intro, then user scroll scrubs the remaining frames
 * while the section stays pinned.
 *
 * Improvements over the reference implementation:
 *  - canvas is sized to the real viewport (+devicePixelRatio) and frames are
 *    drawn cover-fit, so the face is never stretched on non-16:9 windows
 *  - React state only updates when a text-reveal *stage* is crossed
 *    (not 60×/sec per scrubbed frame)
 *  - GSAP work is scoped to this component via gsap.context
 */
const FRAME_COUNT = 192; // 8s Veo clip @ 24fps
const currentFrame = (index) => `/hero-frames/frame-${(index + 1).toString().padStart(3, '0')}.jpg`;

/*
 * The clip is a half-turn (side → front → back). Played linearly it ends on
 * the back of the head. So the scrub runs a palindrome timeline instead:
 * boot auto-plays side→front (0–95), scroll turns her away (95–191) and then
 * mirrors the frames to bring her back to front (191–287). Feels like one
 * continuous circular rotation that ends facing the camera.
 */
const FRONT = 95;                       // full-front frame
const VIRTUAL_END = 2 * (FRAME_COUNT - 1) - FRONT; // 287
const realFrame = (v) => (v <= FRAME_COUNT - 1 ? v : 2 * (FRAME_COUNT - 1) - v);

// Text reveals gated on the virtual rotation: name while turning to camera,
// role at full-front, description mid-turn, CTA as she returns to front.
const stageFor = (v) => (v >= VIRTUAL_END - 6 ? 4 : v >= 195 ? 3 : v >= FRONT - 5 ? 2 : v >= 55 ? 1 : 0);

export default function Hero() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [stage, setStage] = useState(0);

  const imagesRef = useRef([]);
  const seqRef = useRef({ frame: 0 });

  useEffect(() => {
    let loadedCount = 0;
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      const done = () => {
        loadedCount++;
        setLoadingProgress(Math.floor((loadedCount / FRAME_COUNT) * 100));
        if (loadedCount === FRAME_COUNT) setLoaded(true);
      };
      img.onload = done;
      img.onerror = done;
      imagesRef.current.push(img);
    }
  }, []);

  useEffect(() => {
    if (!loaded) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx2d = canvas.getContext('2d');

    const render = () => {
      if (!canvasRef.current || !imagesRef.current.length) return;
      let virtualIdx = Math.round(seqRef.current.frame);
      if (virtualIdx > VIRTUAL_END) virtualIdx = VIRTUAL_END;
      if (virtualIdx < 0) virtualIdx = 0;
      const frameIdx = realFrame(virtualIdx);

      const img = imagesRef.current[frameIdx];
      if (img && img.complete && img.naturalHeight !== 0) {
        ctx2d.clearRect(0, 0, canvas.width, canvas.height);
        // cover-fit: crop, never stretch
        const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
        const x = (canvas.width - img.width * scale) / 2;
        const y = (canvas.height - img.height * scale) / 2;
        ctx2d.drawImage(img, x, y, img.width * scale, img.height * scale);
      }
      // React re-renders only when a reveal stage is crossed
      setStage(stageFor(virtualIdx));
    };

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      render();
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const gctx = gsap.context(() => {
      // --- 1. SYSTEM BOOT OPENING EXPERIENCE ---
      const bootTl = gsap.timeline({ delay: 0.5 });

      bootTl.fromTo('.noise-overlay', { opacity: 0 }, { opacity: 0.15, duration: 1, ease: 'none' }, 0);
      bootTl.fromTo('.center-glow', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1.5, ease: 'power1.inOut' }, 0.2);
      bootTl.fromTo('nav', { y: -50, opacity: 0, filter: 'blur(10px)' }, { y: 0, opacity: 1, filter: 'blur(0)', duration: 1, ease: 'power2.out' }, 0.5);
      bootTl.fromTo(canvas, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 1.5, ease: 'power2.out' }, 0.8);
      // auto-turn to face the camera — name + role reveal as she arrives
      bootTl.to(seqRef.current, { frame: FRONT, snap: 'frame', duration: 2.6, ease: 'power2.inOut', onUpdate: render }, 0.8);
      bootTl.fromTo('.social-icon', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.2, stagger: 0.1, ease: 'none' }, 2.4);

      // --- 2. MAIN SCROLL CONTINUATION ---
      const tlScroll = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=4000',
          scrub: 0.8, // heavier lag = the cinematic weight from the reel
          pin: true,
          anticipatePin: 1,
        },
      });

      // Scroll owns the front→away→front leg, starting exactly where the
      // boot turn ends — no snap-back on the first wheel tick.
      const scrollProxy = { p: 0 };
      tlScroll.to(scrollProxy, {
        p: 1,
        ease: 'none',
        duration: 1,
        onUpdate: () => {
          if (bootTl.isActive()) bootTl.progress(1); // hand off instantly
          seqRef.current.frame = FRONT + scrollProxy.p * (VIRTUAL_END - FRONT);
          render();
        },
      });

      tlScroll.fromTo('.portfolio-ui',
        { opacity: 1, filter: 'blur(0px)' },
        { opacity: 0, filter: 'blur(5px)', duration: 0.1, ease: 'none' },
        0.9
      );
      tlScroll.fromTo(canvas,
        { opacity: 1, filter: 'blur(0px)' },
        { opacity: 0, filter: 'blur(10px)', duration: 0.1, ease: 'none' },
        0.9
      );
    }, containerRef);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      gctx.revert(); // kills only this component's tweens/triggers
    };
  }, [loaded]);

  return (
    <div ref={containerRef} id="home" className="relative w-full h-screen bg-[#020202] overflow-hidden flex items-center justify-center font-sans tracking-wide">

      {/* Loading State */}
      {!loaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-50 bg-[#020202]">
          <div className="text-gray-500 font-mono text-xs uppercase tracking-[0.3em] mb-4">&gt; INITIALIZING_CORE_SYSTEM</div>
          <div className="w-64 h-[1px] bg-white/10 overflow-hidden">
            <div className="h-full bg-blue-500 transition-all duration-300 ease-out" style={{ width: `${loadingProgress}%` }}></div>
          </div>
        </div>
      )}

      {/* --- BACKGROUND EFFECTS --- */}
      <div className="portfolio-ui absolute inset-0 z-0 opacity-10 pointer-events-none ref-grid"></div>
      <div className="portfolio-ui noise-overlay absolute inset-0 z-0 pointer-events-none mix-blend-overlay opacity-0 ref-noise"></div>
      <div className="portfolio-ui center-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none opacity-0 mix-blend-screen z-[1]"></div>

      {/* --- SOCIAL LINKS --- */}
      <div className="portfolio-ui absolute bottom-12 left-8 md:left-12 z-[60] flex flex-col space-y-5">
        <a href="https://github.com/ishikachaudhary21" target="_blank" rel="noreferrer" aria-label="GitHub"
          className="social-icon opacity-0 text-gray-500 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all">
          <FiGithub size={18} />
        </a>
        <a href="https://www.linkedin.com/in/ishikachaudhary21" target="_blank" rel="noreferrer" aria-label="LinkedIn"
          className="social-icon opacity-0 text-gray-500 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all">
          <FiLinkedin size={18} />
        </a>
      </div>

      {/* --- CANVAS --- */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full z-10 opacity-0 scale-95"
      />

      {/* --- PORTFOLIO TEXT OVERLAY --- */}
      <AnimatePresence>
        {loaded && (
          <div className="portfolio-ui absolute inset-0 z-[50] pointer-events-none flex flex-col md:flex-row justify-between items-center px-8 md:px-[12%] lg:px-[15%] pt-32 pb-16 md:pt-0 md:pb-0">

            {/* LEFT SIDE: Name and Role */}
            <div className="w-full md:w-[38%] flex flex-col items-center md:items-start text-center md:text-left">
              {stage >= 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="mb-4"
                >
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-sans font-bold text-white tracking-[0.08em] uppercase leading-none" style={{ textShadow: '0 0 20px rgba(255,255,255,0.2)' }}>
                    ISHIKA
                  </h1>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-sans font-bold text-white/70 tracking-[0.12em] uppercase leading-none mt-2">
                    CHAUDHARY
                  </h1>
                </motion.div>
              )}

              {stage >= 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                  className="relative inline-block"
                >
                  <h2 className="text-sm md:text-md lg:text-lg font-mono text-gray-300 tracking-[0.2em] uppercase pb-2">
                    AI / ML &amp; Full Stack Developer
                  </h2>
                  <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/60"></div>
                </motion.div>
              )}
            </div>

            {/* RIGHT SIDE: Description and Button */}
            <div className="w-full md:w-[35%] flex flex-col items-center md:items-start text-center md:text-left mt-16 md:mt-0 md:pl-8">
              {stage >= 3 && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="mb-8"
                >
                  <p className="text-gray-400 text-sm lg:text-base font-light tracking-wide leading-relaxed">
                    Building production AI systems, real-time computer vision and scalable
                    backends — from custom YOLO model training to LLM &amp; RAG integration.
                  </p>
                </motion.div>
              )}

              {stage >= 4 && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                  className="pointer-events-auto"
                >
                  <a href="#projects" className="glass inline-flex items-center px-8 py-3 hover:border-blue-500/50 transition-colors cursor-pointer rounded-xl group">
                    <span className="text-gray-300 font-mono tracking-widest uppercase text-xs group-hover:text-white transition-colors">Explore Work</span>
                  </a>
                </motion.div>
              )}
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
