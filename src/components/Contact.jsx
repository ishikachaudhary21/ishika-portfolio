import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSend, FiActivity, FiShield, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

/*
  Privacy notes (kept from the original build):
  - Phone number intentionally NOT published — it stays in the résumé PDF.
  - Email is assembled at runtime so scraper bots reading the HTML don't harvest it.
  - The form "transmits" by opening the visitor's mail client with the message
    pre-filled (no third-party form service, no API keys to leak).
*/
const USER = 'ishikachaudhary241';
const DOMAIN = 'gmail.com';

const socials = [
  { icon: <FiLinkedin size={16} />, label: 'LINKEDIN', value: 'in/ishikachaudhary21', href: 'https://www.linkedin.com/in/ishikachaudhary21' },
  { icon: <FiGithub size={16} />, label: 'GITHUB', value: 'ishikachaudhary21', href: 'https://github.com/ishikachaudhary21' },
];

const Contact = () => {
  const [email, setEmail] = useState('');
  useEffect(() => { setEmail(`${USER}@${DOMAIN}`); }, []);

  const sendEmail = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subject = encodeURIComponent(`Portfolio contact — ${data.get('name')}`);
    const body = encodeURIComponent(`${data.get('message')}\n\n— ${data.get('name')} (${data.get('email')})`);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  return (
    <div
      id="contact"
      className="relative w-full min-h-screen bg-[#020202] overflow-hidden flex items-center justify-center font-mono py-28 px-6 scroll-mt-24"
    >
      {/* Cinematic backdrop */}
      <div className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none ref-grid"></div>
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none mix-blend-overlay ref-noise"></div>
      <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.5)_100%)]" />

      {/* Peripheral HUD */}
      <div className="absolute inset-0 z-20 pointer-events-none hidden md:block">
        <div className="absolute top-28 left-10 w-24 h-24 border-t border-l border-cyan-500/20" />
        <div className="absolute top-28 right-10 w-24 h-24 border-t border-r border-cyan-500/20" />
        <div className="absolute bottom-10 left-10 w-24 h-24 border-b border-l border-cyan-500/20" />
        <div className="absolute bottom-10 right-10 w-24 h-24 border-b border-r border-cyan-500/20" />

        <div className="absolute top-32 left-14 flex items-center space-x-3">
          <FiActivity className="text-cyan-400 text-xs animate-pulse" />
          <span className="text-cyan-400/40 text-[9px] tracking-[0.4em] uppercase font-bold">Signal_Stable</span>
        </div>
        <div className="absolute bottom-14 right-14 text-right">
          <span className="text-white/10 text-[9px] tracking-[0.6em] uppercase block mb-1">Archive_003</span>
          <span className="text-cyan-500/30 text-[9px] tracking-[0.4em] uppercase">&gt; System_Ready</span>
        </div>
      </div>

      {/* Central Contact UI */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-50 w-full max-w-4xl px-0 md:px-6"
      >
        <div className="text-center mb-8">
          <h2 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none font-sans">
            COMM<span className="text-cyan-500 block sm:inline">.LINK</span>
          </h2>
          <div className="flex items-center justify-center space-x-2 text-cyan-500/60 font-mono text-[9px] tracking-[0.6em] uppercase mt-3">
            <FiShield />
            <span>Open to full-time roles — AI, Backend, Apps</span>
          </div>
        </div>

        {/* Direct channels */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
          <a href={email ? `mailto:${email}` : '#'}
            className="group flex items-center gap-4 bg-white/[0.03] border border-white/10 hover:border-cyan-500/40 px-5 py-4 transition-all">
            <FiMail className="text-cyan-500/60 shrink-0" />
            <div className="min-w-0">
              <div className="text-[8px] uppercase tracking-[0.3em] text-gray-600">COMM_PATH</div>
              <div className="text-[10px] text-gray-300 truncate group-hover:text-white transition-colors">{email || '···'}</div>
            </div>
          </a>
          {socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
              className="group flex items-center gap-4 bg-white/[0.03] border border-white/10 hover:border-cyan-500/40 px-5 py-4 transition-all">
              <span className="text-cyan-500/60 shrink-0">{s.icon}</span>
              <div className="min-w-0">
                <div className="text-[8px] uppercase tracking-[0.3em] text-gray-600">{s.label}</div>
                <div className="text-[10px] text-gray-300 truncate group-hover:text-white transition-colors">{s.value}</div>
              </div>
            </a>
          ))}
        </div>

        <form
          onSubmit={sendEmail}
          className="glass rounded-2xl p-8 md:p-14 space-y-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-3">
              <label className="text-[9px] font-mono font-bold uppercase tracking-[0.3em] text-cyan-500/50 block ml-1">IDENT_SIGNATURE</label>
              <input
                name="name"
                type="text"
                placeholder="ENTER_NAME"
                required
                className="w-full bg-white/5 border-b border-white/10 py-5 px-6 text-white text-[11px] outline-none focus:border-cyan-600 transition-all placeholder:text-gray-700"
              />
            </div>
            <div className="space-y-3">
              <label className="text-[9px] font-mono font-bold uppercase tracking-[0.3em] text-cyan-500/50 block ml-1">COMM_PATH_ADDR</label>
              <input
                name="email"
                type="email"
                placeholder="ENTER_EMAIL"
                required
                className="w-full bg-white/5 border-b border-white/10 py-5 px-6 text-white text-[11px] outline-none focus:border-cyan-600 transition-all placeholder:text-gray-700"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[9px] font-mono font-bold uppercase tracking-[0.3em] text-cyan-500/50 block ml-1">DATA_PAYLOAD</label>
            <textarea
              name="message"
              placeholder="INPUT_TRANSMISSION..."
              required
              className="w-full bg-white/5 border-b border-white/10 py-5 px-6 text-white text-[11px] outline-none focus:border-cyan-600 transition-all min-h-[140px] resize-none placeholder:text-gray-700"
            />
          </div>

          <div className="flex justify-center md:justify-end">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(6, 182, 212, 0.3)' }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="group flex items-center space-x-6 bg-cyan-600 text-black font-black text-[11px] uppercase tracking-[0.6em] px-16 md:px-24 py-6 shadow-2xl transition-all cursor-pointer"
            >
              <span>TRANSMIT</span>
              <FiSend className="text-lg transition-transform group-hover:translate-x-1" />
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Contact;
