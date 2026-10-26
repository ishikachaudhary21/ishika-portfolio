import React from 'react';
import {
  SiPython, SiJavascript, SiDart, SiHtml5, SiCss,
  SiDjango, SiFastapi, SiFlutter, SiReact,
  SiPytorch, SiTensorflow, SiOpencv, SiScikitlearn, SiNvidia,
  SiPostgresql, SiMysql, SiFirebase,
  SiGit, SiDocker, SiLinux, SiPostman,
} from 'react-icons/si';

/*
  Real brand-logo tiles (react-icons/si) where an official mark exists.
  Niche tools with no simple-icons entry (DRF, YOLO, ByteTrack, SSH) fall
  back to a small monogram tile in the same size/shape so the grid stays even.
*/
const Mono = ({ label }) => <span className="font-hud text-[11px] font-bold">{label}</span>;

const skills = [
  { name: 'Python', cat: 'Language', Icon: SiPython, color: '#3776AB' },
  { name: 'JavaScript', cat: 'Language', Icon: SiJavascript, color: '#F7DF1E' },
  { name: 'Dart', cat: 'Language', Icon: SiDart, color: '#39ACE8' },
  { name: 'HTML5', cat: 'Language', Icon: SiHtml5, color: '#E34F26' },
  { name: 'CSS3', cat: 'Language', Icon: SiCss, color: '#4699D9' },

  { name: 'Django', cat: 'Framework', Icon: SiDjango, color: '#5FAD5F' },
  { name: 'DRF', cat: 'Framework', Icon: Mono, color: 'var(--magenta)' },
  { name: 'FastAPI', cat: 'Framework', Icon: SiFastapi, color: '#05998b' },
  { name: 'Flutter', cat: 'Framework', Icon: SiFlutter, color: '#44D1FD' },
  { name: 'React', cat: 'Framework', Icon: SiReact, color: '#61DAFB' },

  { name: 'PyTorch', cat: 'AI / ML', Icon: SiPytorch, color: '#EE4C2C' },
  { name: 'TensorFlow', cat: 'AI / ML', Icon: SiTensorflow, color: '#FF8A3D' },
  { name: 'YOLO', cat: 'AI / ML', Icon: Mono, color: 'var(--violet)' },
  { name: 'OpenCV', cat: 'AI / ML', Icon: SiOpencv, color: '#8b7bf0' },
  { name: 'scikit-learn', cat: 'AI / ML', Icon: SiScikitlearn, color: '#F7A03E' },
  { name: 'CUDA', cat: 'AI / ML', Icon: SiNvidia, color: '#76B900' },

  { name: 'PostgreSQL', cat: 'Database', Icon: SiPostgresql, color: '#6CA3F5' },
  { name: 'MySQL', cat: 'Database', Icon: SiMysql, color: '#5D9FD6' },
  { name: 'Firebase', cat: 'Database', Icon: SiFirebase, color: '#FFCA28' },

  { name: 'Git', cat: 'Tool', Icon: SiGit, color: '#F05032' },
  { name: 'Docker', cat: 'Tool', Icon: SiDocker, color: '#3EA6E8' },
  { name: 'Linux', cat: 'Tool', Icon: SiLinux, color: '#E8E8E8' },
  { name: 'Postman', cat: 'Tool', Icon: SiPostman, color: '#FF6C37' },
  { name: 'SSH', cat: 'Tool', Icon: Mono, color: 'var(--cyan)' },
];

const Tile = ({ s, i }) => {
  const { Icon } = s;
  return (
    <div data-aos="fade-up" data-aos-delay={(i % 6) * 60}
      className="group flex flex-col items-center justify-center gap-2 rounded-xl p-4 text-center transition-all duration-300 hover:-translate-y-1"
      style={{ background: 'var(--panel)', border: '1px solid var(--line)' }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = s.color; e.currentTarget.style.boxShadow = `0 0 20px ${s.color}33`; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.boxShadow = 'none'; }}>
      <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'var(--panel-2)', color: s.color }}>
        {s.Icon === Mono ? <Mono label={s.name.slice(0, 3).toUpperCase()} /> : <Icon size={18} />}
      </div>
      <div>
        <div className="font-hud text-[11px] text-white">{s.name}</div>
        <div className="font-hud text-[9px] uppercase tracking-wide mt-0.5" style={{ color: 'var(--text-mute)' }}>{s.cat}</div>
      </div>
    </div>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="relative w-full py-28 px-6 md:px-12 grid-faint">
      <div className="max-w-6xl mx-auto">
        <div data-aos="fade-up" className="mb-16">
          <p className="font-hud text-xs tracking-[0.35em] uppercase mb-4" style={{ color: 'var(--magenta)' }}>// stats</p>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-white slash inline-block">Skill tree</h2>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {skills.map((s, i) => <Tile key={s.name} s={s} i={i} />)}
        </div>
      </div>
    </section>
  );
};

export default Skills;
