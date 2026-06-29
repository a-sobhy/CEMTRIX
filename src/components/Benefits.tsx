import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { CentralOrb } from "./benefits/CentralOrb"
import { ExpandingCards } from "./benefits/ExpandingCards"
import { BenefitItem, benefits as defaultBenefits } from "./benefits/data"

interface BenefitsProps {
  items?: BenefitItem[];
  title?: string;
  subtitle?: string;
  description?: string;
}

export function Benefits({
  items = defaultBenefits,
  title = "The Key Benefits",
  subtitle = "AI Gives To Your Business",
  description = "Six powerful reasons why leading companies trust Xtract to automate, optimize, and scale.",
}: BenefitsProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"])

  return (
    <section
      id="benefits"
      ref={sectionRef}
      className="py-20 relative overflow-hidden"
    >
      {/* Moving background */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-0 left-1/3 size-150 bg-primary/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 size-125 bg-secondary/8 rounded-full blur-[120px]" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-sm text-gray-300">Why Choose Us</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">{title}</span>
            <br />
            <span className="gradient-text">{subtitle}</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-24 hidden lg:block"
        >
          <CentralOrb benefits={items} />
        </motion.div>

        {/* Expanding cards – desktop */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-20 hidden md:block"
        >
          <ExpandingCards benefits={items} />
        </motion.div>

        {/* Mobile stacked cards */}
        <div className="grid gap-4 md:hidden mb-16">
          {items.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-3xl border border-white/10 bg-dark-card/40"
            >
              <div className="flex items-center gap-4 mb-3">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${b.color}, ${b.accent})`,
                  }}
                >
                  <b.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-2xl font-black text-white">
                    {b.stat}
                  </span>
                  <span className="text-xs text-gray-500 uppercase tracking-wider ml-2">
                    {b.statLabel}
                  </span>
                </div>
              </div>
              <h3 className="text-lg font-bold text-white mb-1">{b.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                {b.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Ticker */}
        {/* <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <StatsTicker benefits={items} />
        </motion.div> */}
      </div>
    </section>
  )
}
