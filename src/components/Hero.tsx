"use client";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import PerspectiveGrid from "./hero/PerspectiveGrid";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const headline1 = "AI-Native Industrial Intelligence Platform";
  const headline2 = "For Cement Industry";
  const HERO_TAGLINE = "Empower People\nOptimize Assets\nAccelerate Performance";

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playVideo = () => {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay was prevented, retry on user interaction if needed
          console.warn("Video autoplay was blocked, will retry.");
        });
      }
    };

    // Try to play immediately
    playVideo();

    // Also try once metadata/data is loaded (helps with SPA nav timing issues)
    video.addEventListener("loadeddata", playVideo);
    video.addEventListener("canplay", playVideo);

    return () => {
      video.removeEventListener("loadeddata", playVideo);
      video.removeEventListener("canplay", playVideo);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-[#030014]"
    >
      {/* Background Layers */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover opacity-30"
      >
        <source src="/assets/bg-vid-loop-smooth.mp4" type="video/mp4" />
      </video>
      <PerspectiveGrid />
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-dark/50 to-dark pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid gap-24 lg:grid-cols-6">
          <div className="lg:text-left lg:col-span-4">
            <motion.h1
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-xl sm:text-2xl lg:text-2xl tracking-tight text-gray-400"
            >
              {headline1}
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0, duration: 0.8 }}
              className="font-bold text-5xl sm:text-6xl lg:text-5xl line-h text-white whitespace-pre-line my-4 leading-15"
            >
              {HERO_TAGLINE}
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="text-5xl sm:text-6xl lg:text-5xl leading-tight tracking-tight gradient-text mb-4"
            >
              {headline2}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1, duration: 0.8 }}
              className="font-normal text-[#F8FAFC] mx-auto lg:mx-0 leading-relaxed"
            >
              CEMTRIX delivers intelligent solutions across workforce
              development, plant performance, and predictive maintenance
              turning operational data and organizational knowledge into
              measurable business value.
            </motion.p>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-dark to-transparent pointer-events-none" />
    </section>
  );
}