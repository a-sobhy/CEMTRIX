"use client";
import { motion } from "framer-motion";
import { useRef } from "react";
import PerspectiveGrid from "./hero/PerspectiveGrid";

// ─── Main Hero Component ──────────────────────────────────────────────────────
export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  // Mouse parallax
  const headline1 = "AI-Native Industrial Intelligence Platform"
  const headline2 = "For Cement Industry"
  const HERO_TAGLINE = "Empower People\nOptimize Assets\nAccelerate Performance"
  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-[#030014]"
    >
      {/* Background Layers */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover opacity-30"
      >
        <source src="/assets/bg-vid-loop-smooth.mp4" type="video/mp4" />
      </video>
      <PerspectiveGrid />
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-dark/50 to-dark pointer-events-none" />
      {/* Aurora Glows - Behind content */}

      {/* MAIN CONTENT - This will appear on top of everything */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid gap-24 lg:grid-cols-6">
          {/* Left: Content */}
          <div
            className="lg:text-left lg:col-span-4"
          >
            {/* Headlines */}

            <motion.h1 initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8, duration: 0.8 }} className="text-xl sm:text-2xl lg:text-2xl tracking-tight text-gray-400">
              {headline1}
            </motion.h1>
            <motion.h1 initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.0, duration: 0.8 }} className="font-bold text-5xl sm:text-6xl lg:text-5xl line-h text-white whitespace-pre-line my-4 leading-15">
              {HERO_TAGLINE}
            </motion.h1>
            <motion.h1 initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.2, duration: 0.8 }} className="text-5xl sm:text-6xl lg:text-5xl leading-tight tracking-tight gradient-text mb-4">
              {headline2}
            </motion.h1>
            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1, duration: 0.8 }}
              className="font-normal text-[#F8FAFC] mx-auto lg:mx-0 leading-relaxed"
            >
              CEMTRIX delivers intelligent solutions across workforce development, plant performance, and predictive maintenance turning operational data and organizational knowledge into measurable business value.
            </motion.p>
            {/* CTAs */}
            {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8 }}
              className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
            >
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 py-4 rounded-lg bg-white text-black font-bold overflow-hidden"
              >
                <div className="absolute inset-0 bg-linear-to-r from-[#00A8FF] to-[#7B2CFF] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors">
                  Initialize System <ArrowRight className="w-4 h-4" />
                </span>
              </motion.a>
            </motion.div> */}
            {/* Stats */}
            {/* <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2 }}
              className="flex items-center gap-8 justify-center lg:justify-start pt-4 border-t border-white/10"
            >
              <div>
                <div className="text-2xl font-bold text-white font-mono">
                  99.9%
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">
                  Uptime
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white font-mono">
                  &lt;50ms
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">
                  Latency
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white font-mono">
                  24/7
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">
                  Autonomy
                </div>
              </div>
            </motion.div> */}
          </div>
          {/* Right: Holographic Visual */}
          {/* <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex justify-center lg:justify-end lg:col-span-2"
          >
            <HolographicCore />
          </motion.div> */}
        </div>
      </div>
      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-dark to-transparent pointer-events-none" />
    </section>
  )
}
