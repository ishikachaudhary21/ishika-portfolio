import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiCpu, FiShield, FiActivity, FiArrowUpRight } from 'react-icons/fi';

const Footer = () => {
  const [systemTime, setSystemTime] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setSystemTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const socialLinks = [
    { icon: <FiGithub />, label: 'GITHUB', url: 'https://github.com/ishikachaudhary21', color: 'hover:text-white' },
    { icon: <FiLinkedin />, label: 'LINKEDIN', url: 'https://www.linkedin.com/in/ishikachaudhary21', color: 'hover:text-blue-500' },
  ];

  return (
    <footer className="relative w-full bg-[#050505] overflow-hidden pt-20 pb-10 font-sans">

      {/* Digital Grid Overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none ref-grid"></div>

      {/* Pulsing Light Blobs */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-cyan-600/5 blur-[120px] rounded-full animate-pulse pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-cyan-600/5 blur-[120px] rounded-full animate-pulse delay-700 pointer-events-none" />

      {/* Top Divider (Animated Beam) */}
      <div className="relative w-full h-[1px] bg-white/5 mb-20 overflow-hidden">
        <motion.div
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          className="absolute top-0 left-0 w-[200px] h-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent shadow-[0_0_15px_rgba(6,182,212,0.5)]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">

          {/* Brand/Core */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="w-10 h-10 bg-cyan-600/10 border border-cyan-500/20 rounded-lg flex items-center justify-center group-hover:bg-cyan-600 group-hover:border-cyan-500 transition-all duration-500">
                <FiCpu className="text-cyan-500 text-xl group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-2xl font-black text-white tracking-tighter uppercase italic">
                ISHI<span className="text-cyan-600">KA</span>
              </h3>
            </div>
            <p className="text-gray-500 text-xs leading-relaxed uppercase tracking-widest font-light">
              Building intelligent systems — AI, computer vision and full-stack engineering.
            </p>
            <div className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-[10px] text-gray-600 font-mono tracking-widest uppercase">System Status: Online</span>
            </div>
          </motion.div>

          {/* Navigation Hub */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            <h4 className="text-[11px] font-mono font-bold text-cyan-500/80 tracking-[0.4em] uppercase">Control_Center</h4>
            <ul className="space-y-4">
              {[['About', '#about'], ['Services', '#services'], ['Portfolio', '#projects'], ['Contact', '#contact']].map(([item, href]) => (
                <li key={item}>
                  <a href={href} className="group flex items-center text-xs text-gray-500 hover:text-white transition-all tracking-widest">
                    <span className="w-0 group-hover:w-4 h-[1px] bg-cyan-500 mr-0 group-hover:mr-3 transition-all duration-300"></span>
                    {item.toUpperCase()}
                  </a>
                </li>
              ))}
            </ul>
            <div className="pt-4 space-y-2">
              <div className="flex items-center space-x-2 text-[9px] text-gray-600 tracking-widest uppercase">
                <FiShield className="text-cyan-500/40" />
                <span>Secure Headers Enabled</span>
              </div>
              <div className="flex items-center space-x-2 text-[9px] text-gray-600 tracking-widest uppercase">
                <FiActivity className="text-cyan-500/40" />
                <span>Neural Link Stable</span>
              </div>
            </div>
          </motion.div>

          {/* Social Comms */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <h4 className="text-[11px] font-mono font-bold text-cyan-500/80 tracking-[0.4em] uppercase">Broadcast_Link</h4>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5, scale: 1.1 }}
                  className={`relative w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 rounded-xl text-xl text-gray-400 ${social.color} transition-all duration-300 group`}
                >
                  <div className="absolute inset-0 border border-cyan-500/0 group-hover:border-cyan-500/40 rounded-xl opacity-0 group-hover:opacity-100 transition-all scale-110 group-hover:scale-100" />
                  {social.icon}
                  <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-cyan-600 text-white text-[8px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none tracking-widest font-bold">
                    {social.label}
                  </span>
                </motion.a>
              ))}
            </div>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-gradient-to-r from-cyan-600 to-blue-800 text-black font-black text-[10px] uppercase tracking-[0.5em] rounded-xl shadow-[0_10px_30px_rgba(6,182,212,0.2)] flex items-center justify-center space-x-3 group overflow-hidden relative"
            >
              <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:left-[100%] transition-all duration-1000" />
              <span>Initiate Transmission</span>
              <FiArrowUpRight className="text-lg group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </motion.a>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center space-x-6">
            <div className="text-[10px] text-gray-600 tracking-[0.3em] font-mono flex items-center">
              <span className="w-1.5 h-1.5 bg-cyan-600 rounded-full mr-2"></span>
              REACT // VITE // GSAP // FRAMER
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <div className="text-[10px] text-gray-500 tracking-[0.4em] font-mono uppercase mb-1">
              Local_Time: {systemTime}
            </div>
            <p className="text-[9px] text-gray-700 tracking-[0.2em] font-mono uppercase">
              &copy; {new Date().getFullYear()} ISHIKA CHAUDHARY. ALL NEURAL LINKS RESERVED.
            </p>
          </div>
        </div>
      </div>

      {/* Scanline Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #fff 2px, #fff 4px)' }}>
      </div>
    </footer>
  );
};

export default Footer;
