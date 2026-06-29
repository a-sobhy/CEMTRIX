import { motion } from "framer-motion"
import { Activity, RefreshCw, Settings, Users, Zap } from "lucide-react"

const checks = [
  { icon: Activity, label: "System check" },
  { icon: Settings, label: "Process check" },
  { icon: Zap, label: "Speed check" },
  { icon: Users, label: "Manual work" },
  { icon: RefreshCw, label: "Repetitive task" },
]

export function RadarVisual() {
  return (
    <div className="grid grid-cols-2 gap-4 mt-6">
      {/* Radar Circle */}
      <div className="relative aspect-square rounded-2xl bg-black/60 border border-white/10 flex items-center justify-center overflow-hidden">
        <div className="relative w-[85%] aspect-square">
          {/* Concentric circles */}
          <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full">
            <circle
              cx="100"
              cy="100"
              r="95"
              fill="none"
              stroke="rgba(139, 92, 246, 0.15)"
              strokeWidth="1"
            />
            <circle
              cx="100"
              cy="100"
              r="70"
              fill="none"
              stroke="rgba(139, 92, 246, 0.15)"
              strokeWidth="1"
            />
            <circle
              cx="100"
              cy="100"
              r="45"
              fill="none"
              stroke="rgba(139, 92, 246, 0.15)"
              strokeWidth="1"
            />
            <circle
              cx="100"
              cy="100"
              r="20"
              fill="none"
              stroke="rgba(139, 92, 246, 0.2)"
              strokeWidth="1"
            />
            <line
              x1="100"
              y1="5"
              x2="100"
              y2="195"
              stroke="rgba(139, 92, 246, 0.1)"
              strokeWidth="1"
            />
            <line
              x1="5"
              y1="100"
              x2="195"
              y2="100"
              stroke="rgba(139, 92, 246, 0.1)"
              strokeWidth="1"
            />
          </svg>

          {/* Pulse rings */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="absolute w-full h-full rounded-full border border-secondary/40 radar-pulse" />
            <div
              className="absolute w-full h-full rounded-full border border-secondary/40 radar-pulse"
              style={{ animationDelay: "1s" }}
            />
            <div
              className="absolute w-full h-full rounded-full border border-secondary/40 radar-pulse"
              style={{ animationDelay: "2s" }}
            />
          </div>

          {/* Rotating sweep */}
          <div className="absolute inset-0 radar-sweep">
            <div
              className="absolute top-0 left-1/2 w-1/2 h-1/2 origin-bottom-left"
              style={{
                background:
                  "linear-gradient(200deg, rgba(139, 92, 246, 0) 26%, rgba(139, 92, 246, 0.8) 75%)",
                // "conic-gradient(from 0deg, transparent 0deg, rgba(139, 92, 246, 0.6) 30deg, transparent 60deg)",
                clipPath: "polygon(0px 0px, 75% 30%, 0 100%)",
              }}
            />
          </div>

          {/* Center dot */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-secondary shadow-[0_0_10px_rgba(139,92,246,0.8)]" />
        </div>

        <div className="absolute bottom-3 left-0 right-0 text-center">
          <span className="text-xs text-gray-400">
            Analyzing current workflow..
          </span>
        </div>
      </div>

      {/* Checks List */}
      <div className="space-y-2">
        {checks.map((check, i) => (
          <motion.div
            key={check.label}
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10"
          >
            <check.icon className="w-3.5 h-3.5 text-secondary shrink-0" />
            <span className="text-xs text-gray-300">{check.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
