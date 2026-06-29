"use client";
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

const faqs = [
  {
    id: '1',
    question: 'How can AI automation help my business?',
    answer: 'AI automation can help your business by eliminating repetitive tasks, improving accuracy, reducing operational costs, and freeing up your team to focus on strategic initiatives. It can handle everything from data entry and customer support to complex decision-making processes.',
  },
  {
    id: '2',
    question: 'Is AI automation difficult to integrate?',
    answer: "Not at all! Our team handles the entire integration process seamlessly. We work with your existing tools and systems to ensure minimal disruption. Most businesses are up and running with their first automations within days.",
  },
  {
    id: '3',
    question: 'What industries can benefit from AI automation?',
    answer: "Virtually every industry can benefit! We've successfully implemented AI solutions in healthcare, finance, e-commerce, manufacturing, professional services, and more. The key is identifying the right processes to automate.",
  },
  {
    id: '4',
    question: 'Do I need technical knowledge to use AI automation?',
    answer: 'No technical knowledge required! Our solutions are designed to be user-friendly. We provide comprehensive training and ongoing support to ensure your team can effectively use and manage the automation systems.',
  },
  {
    id: '5',
    question: 'What kind of support do you offer?',
    answer: 'We offer comprehensive support including initial onboarding, training sessions, dedicated account management, 24/7 technical support for enterprise clients, and continuous optimization to ensure your automations perform at their best.',
  },
];

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
          <motion.span variants={fadeInUp} className="text-accent font-semibold text-sm uppercase tracking-wider">
            FAQs
          </motion.span>
          <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl font-bold mt-4 mb-6">
            <span className="text-white">We&apos;ve Got the Answers</span>
            <br />
            <span className="gradient-text">You&apos;re Looking For</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-gray-400 text-lg">
            Quick answers to your AI automation questions.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="space-y-4"
        >
          {faqs.map((faq) => (
            <motion.div
              key={faq.id}
              variants={fadeInUp}
              className="rounded-2xl bg-dark-card/50 backdrop-blur-sm border border-white/10 overflow-hidden"
            >
              <button
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                className="w-full p-6 flex items-center justify-between text-left cursor-pointer"
              >
                <span className="text-lg font-semibold text-white pr-4">{faq.question}</span>
                <motion.div
                  animate={{ rotate: openId === faq.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openId === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-6 text-gray-400 leading-relaxed">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
