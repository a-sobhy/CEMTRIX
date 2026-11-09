"use client";
import { whoWeAre, whyCemtrix } from "@/data/company";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { SectionLabel } from "./SectionLabel";

const fadeInUp = {
  hidden: { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

/** Home page brief of "Who we are" and "Why CEMTRIX". The full version is on /about. */
export function AboutPreview() {
  return (
    <section id="about" className="py-12 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Who we are */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid gap-12 lg:grid-cols-2 lg:items-center"
        >
          <div>
            <motion.div variants={fadeInUp} className="mb-6">
              <SectionLabel>{whoWeAre.label}</SectionLabel>
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-3xl lg:text-5xl font-bold mb-6">
              <span className="text-white">AI built for cement,</span>
              <br />
              <span className="gradient-text">by people who know cement</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-400 text-md lg:text-lg leading-relaxed">
              {whoWeAre.description}
            </motion.p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {whoWeAre.stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeInUp}
                className="rounded-3xl border border-white/10 bg-dark-card/45 p-6"
              >
                <div className="gradient-text mb-2 text-4xl font-bold">{stat.value}</div>
                <p className="text-sm text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Why CEMTRIX */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mt-20"
        >
          <motion.h3 variants={fadeInUp} className="text-2xl lg:text-3xl font-bold text-white mb-8">
            {whyCemtrix.heading}
          </motion.h3>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {whyCemtrix.items.map((item) => (
              <motion.div
                key={item.title}
                variants={fadeInUp}
                className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/3 p-5"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/5 text-primary">
                  <item.icon className="h-5 w-5" />
                </div>
                <p className="font-semibold text-white">{item.title}</p>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeInUp} className="mt-10">
            <Link
              href="/about"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white border border-white/10 hover:border-white/30 font-medium transition-colors"
            >
              More about CEMTRIX
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
