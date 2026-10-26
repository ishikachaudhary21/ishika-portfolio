import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 w-full h-screen z-[100000] flex items-center justify-center grid-faint"
          style={{ backgroundColor: 'var(--bg)' }}
        >
          <motion.div
            exit={{ opacity: 0, scale: 0.96, y: -16 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="relative font-display text-6xl md:text-8xl font-bold tracking-tight"
          >
            <div style={{ color: 'rgba(255,255,255,0.06)' }}>ISHIKA</div>
            <motion.div
              className="absolute top-0 left-0 overflow-hidden whitespace-nowrap neon-cyan"
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              animate={{ clipPath: 'inset(0 0% 0 0)' }}
              transition={{ duration: 1.5, ease: 'easeInOut', delay: 0.15 }}
            >
              ISHIKA
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="font-hud text-xs md:text-sm tracking-[0.4em] text-center mt-4"
              style={{ color: 'var(--text-mute)' }}
            >
              LOADING PORTFOLIO
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
