import React, { useRef, useState } from 'react';
import { FiVolume2, FiVolumeX } from 'react-icons/fi';

/*
  Ambient background-audio toggle, styled like the reference sites.
  No track is bundled yet — drop an mp3 at public/ambient.mp3 and this
  starts working immediately with no code changes. Until then it shows
  a one-time hint instead of silently doing nothing.
*/
const AudioToggle = () => {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [hint, setHint] = useState(false);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) { audio.pause(); setPlaying(false); return; }
    try {
      await audio.play();
      setPlaying(true);
    } catch {
      setHint(true);
      setTimeout(() => setHint(false), 3200);
    }
  };

  return (
    <div className="fixed bottom-5 left-5 z-40 hidden md:block">
      <audio ref={audioRef} src="/ambient.mp3" loop preload="none" />
      {hint && (
        <div className="absolute bottom-14 left-0 w-56 rounded-lg px-3 py-2 text-[10px] font-hud"
          style={{ background: 'var(--panel-2)', border: '1px solid var(--line-2)', color: 'var(--text-dim)' }}>
          Add <span className="neon-cyan">public/ambient.mp3</span> to enable sound
        </div>
      )}
      <button onClick={toggle} aria-label={playing ? 'Mute ambient sound' : 'Play ambient sound'}
        className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer"
        style={{ background: 'var(--panel)', border: '1px solid var(--line-2)', color: playing ? 'var(--cyan)' : 'var(--text-mute)', boxShadow: playing ? '0 0 16px rgba(45,226,230,.35)' : 'none' }}>
        {playing ? <FiVolume2 size={16} /> : <FiVolumeX size={16} />}
      </button>
    </div>
  );
};

export default AudioToggle;
