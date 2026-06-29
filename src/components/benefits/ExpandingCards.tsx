import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { BenefitItem } from './data';

export function ExpandingCards({ benefits }: { benefits: BenefitItem[] }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(0);

  return (
    <div className="flex gap-2 h-[340px]">
      {benefits.map((b, i) => {
        const isHovered = hoveredIndex === i;
        return (
          <motion.div
            key={b.title}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            animate={{ flex: isHovered ? 3 : 1 }}
            transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
            className="relative rounded-3xl overflow-hidden border border-white/10 cursor-pointer min-w-0"
            style={{ background: `linear-gradient(180deg, ${b.color}10, ${b.accent}05)` }}
          >
            <motion.div
              className="absolute inset-0 opacity-0"
              animate={{ opacity: isHovered ? 0.15 : 0 }}
              style={{ background: `radial-gradient(circle at 50% 50%, ${b.color}, transparent 70%)` }}
            />

            <div className="relative z-10 h-full flex flex-col p-6">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 shrink-0"
                style={{ background: `linear-gradient(135deg, ${b.color}, ${b.accent})` }}
              >
                <b.icon className="w-6 h-6 text-white" />
              </div>
              <motion.span
                className="text-4xl font-black text-white mb-1"
                animate={{ scale: isHovered ? 1.1 : 1 }}
                style={{ transformOrigin: 'left' }}
              >
                {b.stat}
              </motion.span>
              <span className="text-[10px] text-gray-500 uppercase tracking-widest mb-auto">{b.statLabel}</span>

              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4"
                  >
                    <h3 className="text-lg font-bold text-white mb-2">{b.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{b.description}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
