import { motion } from 'framer-motion';
import { MessageCircle, Settings, Filter, Check, ArrowUp, Headphones } from 'lucide-react';
import { cn } from '../../utils/cn';

const systems = [
  { 
    icon: MessageCircle, 
    label: 'Chatbot system', 
    status: 'Efficiency will increase by 20%', 
    statusIcon: Headphones,
    statusColor: 'text-gray-500'
  },
  { 
    icon: Settings, 
    label: 'Workflow system', 
    status: 'Update available..', 
    statusIcon: ArrowUp,
    statusColor: 'text-purple-400'
  },
  { 
    icon: Filter, 
    label: 'Sales system', 
    status: 'Up to date', 
    statusIcon: Check,
    statusColor: 'text-green-400'
  },
];

export function OptimizationVisual() {
  return (
    <div className="mt-6 space-y-3">
      {systems.map((system, i) => (
        <motion.div
          key={system.label}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.15 }}
          className="flex items-center gap-3 p-3 rounded-xl bg-black/40 border border-white/10"
        >
          <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
            <system.icon className="w-4 h-4 text-gray-300" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white">{system.label}</p>
            <p className="text-xs text-gray-500">{system.status}</p>
          </div>
          <div className={cn('w-8 h-8 rounded-full bg-white/5 flex items-center justify-center', system.statusColor)}>
            <system.statusIcon className="w-4 h-4" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
