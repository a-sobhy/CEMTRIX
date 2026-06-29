import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Bot, Cpu, MessageSquare, BarChart3 } from 'lucide-react';
import { cn } from '../../utils/cn';

const stackIcons = [
  { Icon: Brain, color: 'text-emerald-400', bg: 'from-emerald-500/20 to-teal-500/20' },
  { Icon: Bot, color: 'text-cyan-400', bg: 'from-cyan-500/20 to-blue-500/20' },
  { Icon: Cpu, color: 'text-orange-400', bg: 'from-orange-500/20 to-red-500/20' },
  { Icon: MessageSquare, color: 'text-pink-400', bg: 'from-pink-500/20 to-rose-500/20' },
  { Icon: BarChart3, color: 'text-yellow-400', bg: 'from-yellow-500/20 to-amber-500/20' },
];

export function IntegrationVisual() {
  const [iconIndex, setIconIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIconIndex((prev) => (prev + 1) % stackIcons.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  const current = stackIcons[iconIndex];

  return (
    <div className="mt-6 rounded-2xl bg-black/60 border border-white/10 p-8 relative overflow-hidden h-[220px] flex items-center justify-center">
      {/* Grid background */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: 'radial-gradient(circle, rgba(139,92,246,0.15) 1px, transparent 1px)',
        backgroundSize: '20px 20px',
      }} />

      <div className="relative flex items-center justify-between w-full max-w-sm">
        {/* Left: Our Solution (pulsing orb) */}
        <div className="flex flex-col items-center gap-2 z-10">
          <div className="relative w-16 h-16 rounded-2xl bg-black/80 border border-white/10 flex items-center justify-center">
            {/* Glowing orb */}
            <div className="relative w-10 h-10 rounded-full bg-linear-to-br from-purple-500 via-violet-600 to-fuchsia-700 orb-pulse overflow-hidden">
              <div className="absolute inset-0 rounded-full bg-linear-to-tr from-transparent via-white/30 to-transparent" />
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.5), transparent 60%)',
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              />
            </div>
          </div>
          <span className="text-xs text-gray-400">Our solution</span>
        </div>

        {/* Connection line with traveling signal */}
        <div className="flex-1 relative h-px mx-2">
          {/* Base line */}
          <div className="absolute inset-0 h-px bg-linear-to-r from-purple-500/40 via-white/20 to-purple-500/40 top-1/2 -translate-y-1/2" />
          
          {/* Animated dashed signal */}
          <svg className="absolute inset-0 w-full h-px overflow-visible" preserveAspectRatio="none">
            <line
              x1="0"
              y1="0.5"
              x2="100%"
              y2="0.5"
              stroke="rgba(139, 92, 246, 0.8)"
              strokeWidth="1.5"
              className="signal-flow"
            />
          </svg>

          {/* Traveling pulse dots */}
          {[0, 0.7, 1.4].map((delay, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_10px_rgba(139,92,246,0.9)]"
              animate={{
                left: ['0%', '100%'],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay,
                ease: 'linear',
                times: [0, 0.1, 0.9, 1],
              }}
            />
          ))}
        </div>

        {/* Right: Your Stack (changing icons) */}
        <div className="flex flex-col items-center gap-2 z-10">
          <div className="relative w-16 h-16 rounded-2xl bg-black/80 border border-white/10 flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={iconIndex}
                initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
                transition={{ duration: 0.4 }}
                className={cn(
                  'w-10 h-10 rounded-xl bg-linear-to-br flex items-center justify-center',
                  current.bg
                )}
              >
                <current.Icon className={cn('w-6 h-6', current.color)} />
              </motion.div>
            </AnimatePresence>
          </div>
          <span className="text-xs text-gray-400">Your stack</span>
        </div>
      </div>
    </div>
  );
}
