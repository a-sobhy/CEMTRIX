"use client";
import { AnimatePresence, motion } from 'framer-motion';
import { Activity, BarChart3, ChevronLeft, ChevronRight, Cpu } from 'lucide-react';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const slides = [
  {
    id: 1,
    url: '/assets/Plant-Intelligence-1.jpeg',
    title: 'Dashboard',
    icon: Activity
  },
  {
    id: 2,
    url: '/assets/Plant-Intelligence-2.jpeg',
    title: 'Analytics',
    icon: Cpu
  },
  {
    id: 3,
    url: '/assets/Plant-Intelligence-3.jpeg',
    title: 'Monitoring',
    icon: BarChart3
  }
];

export function AIAssistantVisual() {
  "use client";
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative group rounded-2xl bg-black/40 border border-white/10 overflow-hidden aspect-video shadow-2xl">
      {/* Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <Image
            src={slides[currentIndex].url}
            alt={slides[currentIndex].title}
            fill
            className="object-fill"
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* UI Elements */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-end z-10">
        <div className="flex gap-2">
          <button
            onClick={prevSlide}
            className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 text-white" />
          </button>
          <button
            onClick={nextSlide}
            className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
          >
            <ChevronRight className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      {/* Progress indicators */}
      <div className="absolute top-4 right-4 flex gap-1 z-10">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`h-1 rounded-full transition-all duration-300 ${i === currentIndex ? 'w-6 bg-primary' : 'w-2 bg-white/20'
              }`}
          />
        ))}
      </div>

    </div>
  );
}
