import { motion } from 'framer-motion';
import { Award, BookOpen, Bot, BrainCircuit, Library, Map } from 'lucide-react';

const allTasks = [
  { icon: BrainCircuit, title: 'AI Journey' },
  { icon: Map, title: 'Learning Paths' },
  { icon: BookOpen, title: 'Courses' },
  { icon: Award, title: 'Certifications' },
  { icon: Library, title: 'Knowledge Hub' },
  { icon: Bot, title: 'CEMBOT' },
];

export function WorkflowVisual() {
  // Duplicate for seamless loop
  const tasks = [...allTasks, ...allTasks];

  return (
    <div className="p-6 rounded-2xl bg-black/60 border border-white/10 overflow-hidden">

      {/* Task List - Scrolling */}
      <div className="relative h-60 overflow-hidden">
        <motion.div
          className="space-y-2"
          animate={{ y: [0, -400] }}
          transition={{
            y: {
              duration: 20,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'linear',
            },
          }}
        >
          {tasks.map((task, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5 hover:border-white/10 transition-colors"
            >
              <task.icon className="w-4 h-4 text-gray-400" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white font-medium">{task.title}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Fade edges */}
        <div className="absolute top-0 left-0 right-0 h-8 bg-linear-to-b from-black/60 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-linear-to-t from-black/60 to-transparent pointer-events-none" />
      </div>
    </div>
  );
}
