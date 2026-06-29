import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { AnimatedStat } from './AnimatedStat';
import { BenefitItem } from './data';
import { OrbitRing } from './OrbitRing';

export function CentralOrb({ benefits }: { benefits: BenefitItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setActiveIndex((i) => (i + 1) % benefits.length), 3000);
    return () => clearInterval(interval);
  }, []);

  const current = benefits[activeIndex];

  return (
    <div className="relative w-full aspect-square max-w-125 mx-auto">
      {/* Orbit rings */}
      <OrbitRing radius={110} duration={20} color={benefits[0].color} dotSize={5} />
      <OrbitRing radius={160} duration={30} color={benefits[1].color} dotSize={4} />
      <OrbitRing radius={210} duration={40} color={benefits[2].color} dotSize={3} />

      {/* Pulsing glow behind orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          className="w-48 h-48 rounded-full blur-[80px]"
          animate={{
            backgroundColor: [current.color, current.accent, current.color],
            opacity: [0.2, 0.35, 0.2],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </div>

      {/* Center glass card */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-54 h-54 rounded-full bg-dark-card/10 backdrop-blur-xl border border-white/5 flex flex-col items-center justify-center overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{
            background: [
              `linear-gradient(135deg, ${current.color}40, transparent)`,
              `linear-gradient(225deg, ${current.accent}40, transparent)`,
              `linear-gradient(135deg, ${current.color}40, transparent)`,
            ],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 flex flex-col items-center text-center px-4"
          >
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mb-3"
              style={{ background: `linear-gradient(135deg, ${current.color}80, ${current.accent}60)` }}
            >
              <current.icon className="w-7 h-7 text-white" />
            </div>
            <span className="text-3xl font-black text-white mb-1">
              <AnimatedStat value={current.stat} />
            </span>
            <span className="text-xs text-gray-400 uppercase tracking-wider">{current.statLabel}</span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Floating benefit nodes */}
      {benefits.map((b, i) => {
        const angle = (i / benefits.length) * Math.PI * 2 - Math.PI / 2;
        const nodeRadius = 210;
        const x = Math.cos(angle) * nodeRadius;
        const y = Math.sin(angle) * nodeRadius;

        return (
          <motion.button
            key={b.title}
            onClick={() => setActiveIndex(i)}
            className="absolute top-1/2 left-1/2 cursor-pointer group"
            style={{ x: x - 20, y: y - 20 }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.95 }}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${i === activeIndex
                ? 'border-white/30 shadow-lg'
                : 'border-white/10 bg-dark-card/60'
                }`}
              style={
                i === activeIndex
                  ? { background: `linear-gradient(135deg, ${b.color}, ${b.accent})`, boxShadow: `0 0 20px ${b.color}60` }
                  : {}
              }
            >
              <b.icon className={`w-5 h-5 ${i === activeIndex ? 'text-white' : 'text-gray-500'}`} />
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
