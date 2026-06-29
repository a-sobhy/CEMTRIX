"use client";
import { AnimatePresence, motion, useMotionValue } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useState } from 'react';

interface CaseStudy {
  id: number;
  logo: string;
  title: string;
  description: string;
  impact: string[];
  image: string;
}

const caseStudies: CaseStudy[] = [
  {
    id: 1,
    logo: 'SMARTCEM',
    title: 'AI-Powered Learning platform',
    description: "An AI-native workforce intelligence platform built specifically for cement operations, capturing institutional knowledge before it walks out the door.",
    impact: ['20-40% Safety & Compliance', '20-30% Lower Training Costs', '15%-25% Improved Productivity', '10-20% Lower Attrrition Cost'],
    image: '/assets/case-studies/1.png',
  },
  {
    id: 2,
    logo: 'Plant Intelligence',
    title: 'AI-Powered Plant Intelligence Platform',
    description: "A unified intelligence platform that continuously monitors production, energy, quality, and process KPIs, enabling teams to make faster decisions, identify optimization opportunities, and drive sustainable operational excellence.",
    impact: ['80–90% Faster Access to Critical KPIs', '50–70% Reduction in Manual Reporting Effort', '30–50% Faster Issue Identification & Resolution'],
    image: '/assets/case-studies/2.png',
  },
  // {
  //   id: 2,
  //   logo: 'NEXUS',
  //   title: '"Operational costs decreased by 45% after workflow automation"',
  //   description: 'Nexus Logics was spending hundreds of hours on manual data entry. Our custom automation engine streamlined their entire supply chain reporting, freeing up staff for high-value tasks.',
  //   impact: ['45% Cost Reduction', '200+ Hours Saved/Mo', 'Zero Data Entry Errors', 'Real-time Analytics'],
  //   image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200',
  // },
  // {
  //   id: 3,
  //   logo: 'VORTEX',
  //   title: '"Customer satisfaction reached an all-time high with AI support"',
  //   description: 'Vortex Tech implemented our AI Assistant to handle 80% of routine support tickets. This allowed their human team to focus on complex cases, improving response quality and speed.',
  //   impact: ['92% CSAT Score', '80% Ticket Automation', 'Instant Response Time', '24/7 Support Coverage'],
  //   image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200',
  // },
];

export function CaseStudies() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const dragX = useMotionValue(0);

  const goNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % caseStudies.length);
  };

  const goPrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + caseStudies.length) % caseStudies.length);
  };

  const onDragEnd = () => {
    const x = dragX.get();
    if (x <= -100) goNext();
    else if (x >= 100) goPrev();
  };

  const current = caseStudies[currentIndex];

  return (
    <section id="case-studies" className="py-12 sm:py-32 relative overflow-hidden bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-400 mb-6"
          >
            Case Studies
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold text-white mb-6"
          >
            See How Smart AI Automation
            <br />
            Transforms Businesses
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg"
          >
            See how AI automation streamlines operations, boosts and drives growth.
          </motion.p>
        </div>

        {/* Slider */}
        <div className="relative min-h-[420px] cursor-grab active:cursor-grabbing select-none">
          <AnimatePresence initial={false} mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? 300 : -300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -300 : 300 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              style={{ x: dragX }}
              onDragEnd={onDragEnd}
              className="grid lg:grid-cols-12 gap-12 items-center"
            >
              <div className="relative rounded-3xl overflow-hidden aspect-4/3 shadow-xl shadow-blue-800/10 lg:col-span-5">
                <img
                  src={current.image}
                  alt={current.logo}
                  className="w-full h-full object-cover pointer-events-none"
                />
              </div>

              <div className="text-left lg:col-span-7">
                <p className="text-3xl font-black text-white/20 mb-8 tracking-widest">{current.logo}</p>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 leading-tight">{current.title}</h3>
                <p className="text-gray-400 text-lg mb-8 leading-relaxed">{current.description}</p>
                <p className="text-white font-semibold mb-2">Impact :</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4">
                  {current.impact.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      <span className="text-sm font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="mt-10 flex flex-col items-center gap-6">
          <div className="flex items-center gap-8">
            <button
              onClick={goPrev}
              className="p-3 rounded-full border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <span className="flex items-center gap-3 text-xs font-bold text-gray-500 tracking-widest uppercase">
              <ArrowLeft className="w-4 h-4" />
              DRAG TO EXPLORE
              <ArrowRight className="w-4 h-4" />
            </span>
            <button
              onClick={goNext}
              className="p-3 rounded-full border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
            >
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>

          <div className="flex gap-2">
            {caseStudies.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > currentIndex ? 1 : -1); setCurrentIndex(i); }}
                className={`h-1 rounded-full transition-all duration-300 cursor-pointer ${i === currentIndex ? 'w-8 bg-primary' : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
