import React from 'react';
import { FiAward, FiBookOpen, FiCode, FiDownload } from 'react-icons/fi';
import {
  SiPython,
  SiDjango,
  SiReact,
  SiPytorch,
  SiTensorflow,
  SiFlutter,
  SiDocker,
} from 'react-icons/si';
/* Her real photo, graded to the reference look in CSS: B&W, contrast lifted,
   background crushed toward black + vignette so it melts into the page. */
import photo from '../assets/about/ishika.jpg';

export default function About() {
  const Aboutdata = [
    {
      icon: <FiCode size={20} />,
      title: 'Role',
      desc: 'Full-stack developer at Oodles Technologies — Python, AI/ML, Django, Flutter & React',
    },
    {
      icon: <FiAward size={20} />,
      title: 'Award',
      desc: '"Project of the Month" at Oodles for the AI-powered PPE Monitoring System',
    },
    {
      icon: <FiBookOpen size={20} />,
      title: 'Research',
      desc: 'Co-authored a published paper on Multilingual Handwritten Text Recognition (DL + GenAI)',
    },
  ];

  const Tools = [
    { icon: <SiPython size={24} />, title: 'Python' },
    { icon: <SiDjango size={24} />, title: 'Django' },
    { icon: <SiReact size={24} />, title: 'React' },
    { icon: <SiPytorch size={24} />, title: 'PyTorch' },
    { icon: <SiTensorflow size={24} />, title: 'TensorFlow' },
    { icon: <SiFlutter size={24} />, title: 'Flutter' },
    { icon: <SiDocker size={24} />, title: 'Docker' },
  ];

  return (
    <div id="about" className="relative w-full min-h-screen bg-[#020202] overflow-hidden flex items-center justify-center font-sans tracking-wide py-20 px-6 md:px-12 scroll-mt-24">

      {/* --- BG EFFECTS --- */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
      <div className="absolute inset-0 z-[15] pointer-events-none" style={{ background: 'radial-gradient(circle at 30% 50%, transparent 20%, rgba(0,0,0,0.9) 100%)' }}></div>

      {/* --- STATIC PROFILE IMAGE (LEFT 45%, masked fade) --- */}
      <div className="absolute inset-y-0 left-0 w-[45%] z-10 pointer-events-none overflow-hidden hidden lg:block" style={{ WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)', maskImage: 'linear-gradient(to right, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)' }}>
        <img
          src={photo}
          alt="Ishika Chaudhary"
          className="w-full h-full object-cover opacity-60"
          style={{
            filter: 'grayscale(1) contrast(1.25) brightness(0.62)',
            objectPosition: '50% 22%', // favor the face, crop the selfie arm
          }}
        />
        {/* cinematic grade: crush the light backdrop into the page black */}
        <div className="absolute inset-0" style={{
          background:
            'radial-gradient(70% 55% at 45% 30%, transparent 25%, rgba(2,2,2,0.9) 100%),' +
            'linear-gradient(to top, rgba(2,2,2,0.95) 0%, transparent 45%)',
        }} />
      </div>

      {/* --- CONTENT (RIGHT) --- */}
      <div className="relative z-[50] w-full lg:w-[80%] flex flex-col md:flex-row items-center justify-end">

        <div className="hidden lg:block w-[35%] h-full"></div>

        <div className="w-full lg:w-[65%] flex flex-col space-y-10 pointer-events-auto glass p-8 md:p-12 rounded-2xl">
          {/* Header */}
          <div className="space-y-2">
            <p className="text-blue-500 font-mono text-[10px] uppercase tracking-[0.5em]">SYSTEM INFO</p>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-white tracking-tighter uppercase">
              About Me<span className="text-blue-500">.</span>
            </h2>
          </div>

          {/* Bio */}
          <div className="space-y-4">
            <p className="text-gray-400 text-sm md:text-md lg:text-xl font-light leading-relaxed max-w-2xl">
              I'm <span className="text-white font-medium">Ishika Chaudhary</span>, a full-stack developer
              specializing in <span className="text-white font-medium">Python, AI/ML and computer vision</span>.
              I build production-ready AI systems, real-time video analytics and scalable backends —
              from custom YOLO model training to LLM integration and RAG-based chatbots.
            </p>
            <p className="text-gray-500 text-sm font-light leading-relaxed max-w-2xl">
              Awarded <span className="text-blue-400">"Project of the Month"</span> at Oodles Technologies and
              co-author of a published paper on Multilingual Handwritten Text Recognition using Deep Learning
              and Generative AI (Journal of Information Systems &amp; Computer Management).
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Aboutdata.map((item) => (
              <div key={item.title} className="group p-6 bg-white/5 border border-white/10 hover:border-blue-500/40 transition-all duration-300 rounded-xl">
                <div className="text-blue-500 mb-4 opacity-70 group-hover:opacity-100 transition-opacity">
                  {item.icon}
                </div>
                <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-1">{item.title}</h4>
                <p className="text-gray-500 text-[11px] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Tech Dock */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-mono text-gray-500 tracking-[0.3em] uppercase">Core Tech Stack</h4>
            <div className="flex flex-wrap gap-5">
              {Tools.map((tool) => (
                <div key={tool.title} className="group relative p-4 bg-black/50 border border-white/5 hover:border-blue-500/50 transition-all rounded-xl flex items-center justify-center cursor-help">
                  <div className="text-gray-500 group-hover:text-blue-400 transition-colors">
                    {tool.icon}
                  </div>
                  <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[9px] font-mono py-1.5 px-3 rounded-md opacity-0 group-hover:opacity-100 transition-all pointer-events-none z-[70] whitespace-nowrap shadow-xl">
                    {tool.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="pt-6">
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center space-x-6 px-12 py-4 bg-blue-600 text-white font-bold text-xs uppercase tracking-widest hover:bg-blue-700 transition-all duration-300 rounded-full shadow-lg shadow-blue-900/20"
            >
              <span>Download Resume</span>
              <FiDownload size={16} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
