import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { BenefitItem } from './data';

export function StatsTicker({ benefits }: { benefits: BenefitItem[] }) {
  const items = benefits.map(b => `${b.title} ${b.stat}`);
  const doubled = [...items, ...items];

  return (
    <div className="relative w-full overflow-hidden py-6 border-y border-white/5">
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-3 text-sm text-gray-500">
            <Sparkles className="w-4 h-4 text-primary shrink-0" />
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
