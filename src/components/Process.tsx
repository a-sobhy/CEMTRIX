import { motion } from 'framer-motion';
import { RadarVisual } from './process/RadarVisual';
import { CodeEditorVisual } from './process/CodeEditorVisual';
import { IntegrationVisual } from './process/IntegrationVisual';
import { OptimizationVisual } from './process/OptimizationVisual';

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' as const } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

const steps = [
  {
    number: '1',
    title: 'Smart Analyzing',
    description: 'We assess your needs and identify AI solutions to streamline workflows and improve efficiency.',
    Visual: RadarVisual,
  },
  {
    number: '2',
    title: 'AI Development',
    description: 'Our team builds intelligent automation systems tailored to your business processes.',
    Visual: CodeEditorVisual,
  },
  {
    number: '3',
    title: 'Seamless Integration',
    description: 'We smoothly integrate AI solutions into your existing infrastructure with minimal disruption.',
    Visual: IntegrationVisual,
  },
  {
    number: '4',
    title: 'Continuous Optimization',
    description: 'We refine performance, analyze insights, and enhance automation for long-term growth.',
    Visual: OptimizationVisual,
  },
];

export function Process() {
  return (
    <section id="process" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-dark via-dark-light to-dark" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-20"
        >
          <motion.span variants={fadeInUp} className="text-secondary font-semibold text-sm uppercase tracking-wider">
            Our Process
          </motion.span>
          <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl font-bold mt-4 mb-6">
            <span className="text-white">Our Simple, Smart, and</span>
            <br />
            <span className="gradient-text">Scalable Process</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-gray-400 text-lg max-w-2xl mx-auto">
            We design, develop, and implement automation tools that help you work smarter, not harder
          </motion.p>
        </motion.div>

        {/* 2x2 Grid of Process Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 gap-6"
        >
          {steps.map((step) => (
            <motion.div
              key={step.number}
              variants={scaleIn}
              whileHover={{ y: -6 }}
              className="group p-8 rounded-3xl bg-dark-card/40 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-500"
            >
              <div className="inline-flex items-center px-3 py-1 rounded-md bg-white/5 border border-white/10 mb-4">
                <span className="text-xs text-gray-400">Step {step.number}</span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
              <p className="text-gray-400 leading-relaxed mb-2">{step.description}</p>

              <step.Visual />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
