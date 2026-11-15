"use client";
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { faqs } from '@/data/faqs';
import { SectionLabel } from './SectionLabel';

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

export function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section id="faq" className="pb-32 pt-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-dark via-dark-light to-dark" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-20"
        >
          <motion.div variants={fadeInUp}>
            <SectionLabel align="center">FAQs</SectionLabel>
          </motion.div>
          <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl font-bold mt-4 mb-6">
            <span className="text-white">We&apos;ve Got the Answers</span>
            <br />
            <span className="gradient-text">You&apos;re Looking For</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-gray-400 text-lg">
            Quick answers about Cemtrix AI for cement plants.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="space-y-4"
        >
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            const answerId = `faq-answer-${faq.id}`;
            return (
              <motion.div
                key={faq.id}
                variants={fadeInUp}
                className="rounded-2xl bg-dark-card/50 backdrop-blur-sm border border-white/10 overflow-hidden"
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  className="w-full p-6 flex items-center justify-between text-left cursor-pointer"
                >
                  <span className="text-lg font-semibold text-white pr-4">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  </motion.div>
                </button>
                {/* Always rendered (collapsed to height 0) so every answer is in the server HTML and
                    matches the FAQPage JSON-LD. Unmounting closed answers would hide them from Google. */}
                <motion.div
                  id={answerId}
                  initial={false}
                  animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  aria-hidden={!isOpen}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-6 text-gray-400 leading-relaxed">{faq.answer}</p>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
