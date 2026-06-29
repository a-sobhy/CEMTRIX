import { motion } from 'framer-motion';
import { Bot, Calendar, Check, Clock, Star, Code, FileText } from 'lucide-react';

const projects = [
  { name: 'Customer Support Chatbot', progress: 90, icon: Bot, color: 'text-primary' },
  { name: 'API Integration Module', progress: 65, icon: Code, color: 'text-secondary' },
  { name: 'Documentation Update', progress: 40, icon: FileText, color: 'text-accent' },
  { name: 'Performance Optimization', progress: 25, icon: Star, color: 'text-yellow-400' },
];

const days = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

export function CustomProjectsVisual() {
  const scrollProjects = [...projects, ...projects];

  return (
    <div className="p-6 rounded-2xl bg-black/60 border border-white/10 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm text-white font-medium">Project Dashboard</p>
          <p className="text-[10px] text-gray-500">4 active projects</p>
        </div>
        <div className="flex gap-1">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-[10px] text-green-400">Live</span>
        </div>
      </div>

      {/* Scrolling Project List */}
      <div className="relative h-[140px] overflow-hidden rounded-xl bg-white/5 mb-4">
        <motion.div
          className="space-y-2 p-3"
          animate={{ y: [0, -120] }}
          transition={{
            y: {
              duration: 12,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'linear',
            },
          }}
        >
          {scrollProjects.map((project, i) => (
            <div key={i} className="flex items-center gap-3 p-2 rounded-lg bg-black/40">
              <div className={`w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center ${project.color}`}>
                <project.icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white font-medium truncate">{project.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 h-1 rounded-full bg-white/10">
                    <motion.div 
                      className={`h-full rounded-full ${project.color.replace('text-', 'bg-')}`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${project.progress}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                    />
                  </div>
                  <span className="text-[10px] text-gray-500">{project.progress}%</span>
                </div>
              </div>
              {project.progress === 100 ? (
                <Check className="w-4 h-4 text-green-400" />
              ) : (
                <Clock className="w-4 h-4 text-gray-500" />
              )}
            </div>
          ))}
        </motion.div>
        
        {/* Fade edges */}
        <div className="absolute top-0 left-0 right-0 h-4 bg-linear-to-b from-black/40 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-linear-to-t from-black/40 to-transparent pointer-events-none" />
      </div>

      {/* Schedule */}
      <div className="p-3 rounded-xl bg-white/5 border border-white/10">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span className="text-xs text-gray-400">This Week</span>
          </div>
          <span className="text-[10px] text-primary">3 meetings scheduled</span>
        </div>
        
        <div className="flex gap-1">
          {days.map((day, i) => (
            <motion.div
              key={day}
              whileHover={{ scale: 1.1 }}
              className={`flex-1 py-2 rounded-lg text-[10px] text-center cursor-pointer transition-colors ${
                i === 2
                  ? 'bg-primary text-white'
                  : i === 4
                  ? 'bg-secondary/50 text-white'
                  : 'bg-white/5 text-gray-500 hover:bg-white/10'
              }`}
            >
              {day}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
