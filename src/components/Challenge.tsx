"use client";
import { challenge } from "@/data/company";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SectionLabel } from "./SectionLabel";

const fadeInUp = {
  hidden: { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};


export function Challenge() {
  return (
    <section id="challenge" className="py-10 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
          <motion.div variants={fadeInUp} className="mb-6">
            <SectionLabel>{challenge.label}</SectionLabel>
          </motion.div>
          <motion.h2 variants={fadeInUp} className="text-3xl lg:text-5xl font-bold mb-14 max-w-3xl">
            <span className="text-white">{challenge.heading.lead}</span>
            <br />
            <span className="gradient-text">{challenge.heading.highlight}</span>
          </motion.h2>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {challenge.pressures.map((pressure) => (
              <motion.a
                key={pressure.title}
                href={pressure.answer.href}
                variants={fadeInUp}
                className="group relative flex flex-col lg:min-h-96 overflow-hidden rounded-3xl border border-white/10 bg-dark-card/40 p-7 transition-colors duration-500 hover:border-white/20"
              >
                <div aria-hidden="true" className="absolute inset-0 grid-pattern" />
                {/* Corner glow, brighter on hover */}
                <div
                  aria-hidden="true"
                  className="absolute -top-20 -right-20 h-56 w-56 rounded-full bg-secondary/15 blur-3xl transition-opacity duration-500 group-hover:opacity-100 opacity-70"
                />
                {/* Oversized icon as a watermark */}
                <pressure.icon
                  aria-hidden="true"
                  strokeWidth={0.75}
                  className="pointer-events-none absolute -bottom-8 -right-8 h-44 w-44 text-white/4 transition-transform duration-700 group-hover:-translate-y-1 group-hover:scale-105"
                />

                <div className="relative flex flex-1 flex-col">
                  <h3 className="mb-4 text-2xl font-bold leading-tight text-white">{pressure.title}</h3>
                  <p className="leading-relaxed text-gray-400">{pressure.description}</p>

                  {/* The CEMTRIX product that answers this pressure */}
                  <div className="mt-auto flex items-center justify-between gap-4 pt-10">
                    <span>
                      <span className="mb-1 block w-fit text-[11px] font-semibold uppercase tracking-[0.25em] gradient-text">Answered by</span>
                      <span className="block text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-gray-200 transition-colors group-hover:text-white">
                        {pressure.answer.name}
                      </span>
                    </span>
                    <ArrowRight className="h-5 w-5 shrink-0 text-gray-500 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white" />
                  </div>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Closing statement */}
          <motion.blockquote variants={fadeInUp} className="mt-14 flex gap-5">
            <span aria-hidden="true" className="w-0.5 shrink-0 rounded-full bg-linear-to-b from-[#008bfd] to-secondary" />
            <p className="text-xl lg:text-2xl font-semibold leading-snug">
              <span className="text-white">{challenge.closing.lead}</span>{" "}
              <span className="gradient-text">{challenge.closing.highlight}</span>
            </p>
          </motion.blockquote>
        </motion.div>
      </div>
    </section>
  );
}
