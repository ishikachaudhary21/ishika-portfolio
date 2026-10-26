import React, { useRef, useState, useEffect } from 'react';
import { FiGithub, FiExternalLink, FiMapPin, FiDroplet, FiTrendingUp, FiZap } from 'react-icons/fi';
import { motion } from 'framer-motion';
import ppeDashboard from '../assets/projects/ppe-dashboard.mp4';
import ppeDetection from '../assets/projects/ppe-detection.mp4';

const GITHUB_PROFILE = 'https://github.com/ishikachaudhary21';

const feeds = [
  { id: 'CAM 01', label: 'Walkthrough', src: ppeDashboard },
  { id: 'CAM 02', label: 'Detection', src: ppeDetection },
];

/* ------------------------------------------------------------------ */
/* In-code UI mockups — until real screenshots exist, each card shows  */
/* a hand-built miniature of the app's UI instead of an empty block.   */
/* Drop a real screenshot via `image:` in projectData to replace one.  */
/* ------------------------------------------------------------------ */

const MockChrome = ({ title, children }) => (
  <div className="absolute inset-0 bg-[#050505] flex flex-col overflow-hidden">
    {/* window bar */}
    <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/5 bg-black/60 shrink-0">
      <span className="w-2 h-2 rounded-full bg-white/10" />
      <span className="w-2 h-2 rounded-full bg-white/10" />
      <span className="w-2 h-2 rounded-full bg-blue-500/40" />
      <span className="ml-2 font-mono text-[8px] tracking-[0.3em] text-gray-500 uppercase">{title}</span>
    </div>
    <div className="relative flex-1">{children}</div>
  </div>
);

/* Body Morph — AI fitness dashboard */
const BodyMorphMock = () => (
  <MockChrome title="BODYMORPH.AI">
    <div className="absolute inset-0 ref-grid opacity-40" />
    <div className="absolute inset-0 flex items-center justify-around px-6">
      {/* calorie ring */}
      <div className="relative w-24 h-24 shrink-0">
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
          <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
          <circle cx="50" cy="50" r="42" fill="none" stroke="#3b82f6" strokeWidth="8"
            strokeDasharray="264" strokeDashoffset="70" strokeLinecap="round" />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-white font-black text-lg leading-none">1,840</span>
          <span className="font-mono text-[7px] text-gray-500 tracking-widest uppercase mt-1">kcal</span>
        </div>
      </div>
      {/* macro bars */}
      <div className="flex flex-col gap-3 w-[45%]">
        {[['PROTEIN', '78%', '#60a5fa'], ['CARBS', '55%', '#3b82f6'], ['FAT', '32%', '#1d4ed8']].map(([l, w, c]) => (
          <div key={l}>
            <div className="flex justify-between font-mono text-[7px] tracking-widest text-gray-500 mb-1">
              <span>{l}</span><span>{w}</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
              <div className="h-full rounded-full" style={{ width: w, background: c }} />
            </div>
          </div>
        ))}
      </div>
    </div>
    {/* detection toast */}
    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/80 border border-blue-500/30 rounded-full px-4 py-1.5">
      <FiZap className="text-blue-400" size={10} />
      <span className="font-mono text-[8px] text-gray-300 tracking-widest uppercase">Food recognized · 92% conf</span>
    </div>
  </MockChrome>
);

/* AbeyO — event map app */
const AbeyOMock = () => (
  <MockChrome title="ABEYO · LIVE MAP">
    {/* stylized dark map */}
    <div className="absolute inset-0" style={{
      background:
        'linear-gradient(115deg, transparent 42%, rgba(255,255,255,0.05) 43%, transparent 44%),' +
        'linear-gradient(25deg, transparent 60%, rgba(255,255,255,0.05) 61%, transparent 62%),' +
        'linear-gradient(160deg, transparent 25%, rgba(255,255,255,0.04) 26%, transparent 27%),' +
        'radial-gradient(80% 80% at 70% 30%, rgba(59,130,246,0.08), transparent 60%), #060608',
    }} />
    <div className="absolute inset-0 ref-grid opacity-30" />
    {/* pins */}
    {[[28, 30], [58, 52], [76, 24]].map(([l, t], i) => (
      <div key={i} className="absolute" style={{ left: `${l}%`, top: `${t}%` }}>
        <span className="block w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse shadow-[0_0_12px_rgba(59,130,246,0.9)]" />
      </div>
    ))}
    {/* event card */}
    <div className="absolute bottom-3 inset-x-4 bg-black/85 border border-white/10 rounded-lg px-4 py-2.5 flex items-center justify-between">
      <div>
        <div className="text-white text-[10px] font-bold tracking-wide">Indie Music Night</div>
        <div className="flex items-center gap-1 font-mono text-[7px] text-gray-500 tracking-widest uppercase mt-0.5">
          <FiMapPin size={8} className="text-blue-400" /> 2.1 KM · TONIGHT 8 PM
        </div>
      </div>
      <span className="font-mono text-[8px] text-blue-400 border border-blue-500/40 rounded-sm px-2.5 py-1 tracking-widest uppercase">RSVP</span>
    </div>
  </MockChrome>
);

/* Eat Well Tracker — daily wellness */
const EatWellMock = () => (
  <MockChrome title="EATWELL · TODAY">
    <div className="absolute inset-0 ref-grid opacity-30" />
    <div className="absolute inset-0 px-6 py-4 flex flex-col justify-between">
      {/* hydration */}
      <div>
        <div className="flex justify-between items-center font-mono text-[7px] tracking-widest text-gray-500 uppercase mb-2">
          <span className="flex items-center gap-1"><FiDroplet size={9} className="text-cyan-400" /> Hydration</span>
          <span>4 / 6</span>
        </div>
        <div className="flex gap-1.5">
          {[1, 1, 1, 1, 0, 0].map((f, i) => (
            <div key={i} className={`h-6 w-4 rounded-b-md rounded-t-sm border ${f ? 'bg-cyan-500/30 border-cyan-400/50' : 'bg-white/5 border-white/10'}`} />
          ))}
        </div>
      </div>
      {/* weight sparkline */}
      <div>
        <div className="flex justify-between items-center font-mono text-[7px] tracking-widest text-gray-500 uppercase mb-1">
          <span className="flex items-center gap-1"><FiTrendingUp size={9} className="text-blue-400" /> Weight · 30d</span>
          <span className="text-blue-400">−2.4 kg</span>
        </div>
        <svg viewBox="0 0 200 40" className="w-full h-9" preserveAspectRatio="none">
          <polyline points="0,10 30,14 60,12 90,20 120,22 150,28 180,26 200,32"
            fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />
          <polyline points="0,10 30,14 60,12 90,20 120,22 150,28 180,26 200,32 200,40 0,40"
            fill="rgba(59,130,246,0.12)" stroke="none" />
        </svg>
      </div>
      {/* streak */}
      <div className="self-start flex items-center gap-2 bg-black/70 border border-white/10 rounded-full px-3 py-1">
        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
        <span className="font-mono text-[8px] text-gray-300 tracking-widest uppercase">12-day streak · synced</span>
      </div>
    </div>
  </MockChrome>
);

const mocks = { BM: <BodyMorphMock />, AB: <AbeyOMock />, EW: <EatWellMock /> };

/*
  repo/demo stay null until real links are supplied — GitHub falls back to the
  profile root; Live Demo simply doesn't render instead of pointing at "#".
  Add `image:` (screenshot in src/assets/projects/) to replace a mockup.
*/
const projectData = [
  {
    title: 'Body Morph',
    blurb: 'AI fitness app at 92% food-recognition accuracy — secure REST APIs and Google Generative AI for personalized nutrition and workout plans.',
    tags: ['Django', 'TensorFlow', 'YOLO', 'GenAI'],
    initials: 'BM', repo: null, demo: null,
  },
  {
    title: 'AbeyO',
    blurb: 'Multi-city social event app in Flutter with Google Maps, real-time updates and smart notifications — cut event planning time by 30%.',
    tags: ['Flutter', 'Dart', 'Google Maps', 'REST'],
    initials: 'AB', repo: null, demo: null,
  },
  {
    title: 'Eat Well Tracker',
    blurb: 'Daily wellness tracker in Flutter + Firebase — food, water and weight logging with real-time sync and personalized reminders.',
    tags: ['Flutter', 'Firebase', 'Realtime DB'],
    initials: 'EW', repo: null, demo: null,
  },
];

const CardShell = ({ children, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    whileHover={{ y: -10 }}
    className="group relative overflow-hidden rounded-[2rem] glass hover:border-blue-500/30 transition-all"
  >
    {children}
  </motion.div>
);

const CardBody = ({ title, blurb, tags, repo, demo, flagship }) => (
  <div className="p-8">
    <div className="flex items-center gap-3 mb-4">
      <h3 className="text-2xl font-black text-white tracking-tight uppercase">{title}</h3>
      {flagship && (
        <span className="font-mono text-[8px] tracking-widest uppercase text-blue-400 border border-blue-500/30 bg-blue-500/5 px-2 py-1 rounded-sm shrink-0">★ Flagship</span>
      )}
    </div>
    <p className="text-gray-500 text-xs font-light leading-relaxed mb-6">{blurb}</p>
    <div className="flex flex-wrap gap-2 mb-8">
      {tags.map((tag) => (
        <span key={tag} className="text-[9px] uppercase tracking-widest font-mono px-3 py-1 bg-white/10 text-blue-300 rounded-full">
          {tag}
        </span>
      ))}
    </div>
    <div className="flex gap-4">
      <a href={repo || GITHUB_PROFILE} target="_blank" rel="noopener noreferrer" aria-label="GitHub Repository" className="p-3 bg-white/5 text-white rounded-xl hover:bg-blue-600 transition-all border border-white/10">
        <FiGithub size={20} />
      </a>
      {demo && (
        <a href={demo} target="_blank" rel="noopener noreferrer" aria-label="Live Demo" className="p-3 bg-white/5 text-white rounded-xl hover:bg-blue-600 transition-all border border-white/10">
          <FiExternalLink size={20} />
        </a>
      )}
    </div>
  </div>
);

/* Flagship card — keeps the two-feed "live camera" switcher */
const PPECard = () => {
  const [active, setActive] = useState(0);
  const [armed, setArmed] = useState(false);
  const sectionRef = useRef(null);
  const vidRefs = useRef([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setArmed(true); io.disconnect(); } },
      { rootMargin: '200px' }
    );
    if (sectionRef.current) io.observe(sectionRef.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    vidRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === active && armed) v.play().catch(() => {});
      else v.pause();
    });
  }, [active, armed]);

  return (
    <div ref={sectionRef}>
      <CardShell index={0}>
        <div className="relative overflow-hidden aspect-[4/3] rounded-[1.5rem] m-2 bg-black">
          {armed && feeds.map((f, i) => (
            <video key={f.id} ref={(el) => (vidRefs.current[i] = el)} src={f.src}
              loop muted playsInline preload={i === 0 ? 'auto' : 'metadata'}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
              style={{ opacity: i === active ? 1 : 0 }} />
          ))}

          {/* HUD overlay */}
          <div className="absolute inset-0 pointer-events-none z-[2]">
            <div className="absolute top-3 left-4 flex items-center gap-1.5 font-mono text-[8px] tracking-widest uppercase text-white">
              <span className="inline-block w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#ff3b3b', boxShadow: '0 0 6px #ff3b3b' }} />
              <span>REC · {feeds[active].label}</span>
            </div>
            <div className="absolute top-3 right-4 font-mono text-[8px] tracking-widest uppercase text-blue-400">LIVE</div>
          </div>

          {/* CAM switcher */}
          <div className="absolute bottom-3 left-4 flex gap-1.5 z-[3]">
            {feeds.map((f, i) => (
              <button key={f.id} onClick={() => setActive(i)}
                className={`font-mono text-[8px] tracking-widest uppercase px-2 py-1 rounded-sm transition-all duration-300 cursor-pointer border ${
                  i === active
                    ? 'text-blue-400 border-blue-500 bg-blue-500/10 shadow-[0_0_10px_rgba(59,130,246,0.35)]'
                    : 'text-gray-500 border-white/10 bg-black/60'
                }`}>
                {f.id}
              </button>
            ))}
          </div>
        </div>

        <CardBody
          title="PPE Monitoring"
          flagship
          blurb="End-to-end AI system — camera discovery, SSH tunneling, geofenced zones and real-time RTSP/MJPEG streaming with a custom YOLOv11 model trained on 10k+ images."
          tags={['Django', 'YOLOv11', 'PyTorch', 'OpenCV', 'CUDA', 'ByteTrack']}
          repo={null}
          demo={null}
        />
      </CardShell>
    </div>
  );
};

const Portfolio = () => {
  return (
    <section id="projects" className="relative bg-[#020202] py-24 px-6 md:px-12 lg:px-24 scroll-mt-24 overflow-hidden">
      {/* Section atmosphere — grid, noise, glow blobs (reference style) */}
      <div className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none ref-grid"></div>
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none mix-blend-overlay ref-noise"></div>
      <div className="absolute -top-32 left-1/4 w-[500px] h-[500px] bg-blue-600/5 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/5 w-[400px] h-[400px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Top divider beam */}
      <div className="relative w-full h-[1px] bg-white/5 mb-20 overflow-hidden">
        <motion.div
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
          className="absolute top-0 left-0 w-[200px] h-full bg-gradient-to-r from-transparent via-blue-500 to-transparent shadow-[0_0_15px_rgba(59,130,246,0.5)]"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto text-center mb-20">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-blue-500 font-mono tracking-[0.4em] uppercase text-[10px] mb-4"
        >
          Project Showcase
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-black text-white mb-8 uppercase tracking-tighter"
        >
          Selected Works<span className="text-blue-500">.</span>
        </motion.h2>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <PPECard />
        {projectData.map((project, index) => (
          <CardShell key={project.title} index={index + 1}>
            <div className="relative overflow-hidden aspect-[4/3] rounded-[1.5rem] m-2">
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              ) : (
                <div className="relative w-full h-full transition-transform duration-700 group-hover:scale-[1.04]">
                  {mocks[project.initials]}
                </div>
              )}
              <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>
            <CardBody {...project} />
          </CardShell>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
