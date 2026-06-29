"use client";
import { services } from "@/data/services";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ServiceDrawer } from "./ServiceDrawer";

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
}

export function Services() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [selectedService, setSelectedService] = useState("")

  const handleOpenDrawer = (serviceTitle: string) => {
    setSelectedService(serviceTitle)
    setDrawerOpen(true)
  }

  return (
    <section id="products" className="py-12 sm:py-32 relative">
      <div className="absolute inset-0 grid-pattern" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Logo Slider */}
        {/* <LogoSlider /> */}

        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-20"
        >
          <motion.span
            variants={fadeInUp}
            className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 mb-6"
          >
            Our Services
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="text-3xl lg:text-5xl font-bold mt-4 mb-6"
          >
            <span className="text-white">AI Solutions That Take Your</span>
            <br />
            <span className="gradient-text">Business to the Next Level</span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-gray-400 text-md lg:text-xl max-w-2xl mx-auto"
          >
            We design, develop, and implement automation tools that help you
            work smarter, not harder
          </motion.p>
        </motion.div>

        {/* Services List */}
        <div className="space-y-24">
          {services.map((service, index) => {
            const isEven = index % 2 === 0
            return (
              <motion.div
                id={service.id}
                key={service.title}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className={`grid lg:grid-cols-12 gap-10 items-center ${!isEven ? "lg:flex-row-reverse" : ""
                  }`}
              >
                {/* Visual Side */}
                <div
                  className={`lg:col-span-7 ${isEven ? "order-1 lg:order-1" : "order-1 lg:order-2"
                    }`}
                >
                  <div className="p-4 rounded-3xl bg-dark-card/30 border border-white/5">
                    <service.Visual />
                  </div>
                </div>

                {/* Content Side */}
                <div
                  className={`lg:col-span-5 ${isEven ? "order-2 lg:order-2" : "order-2 lg:order-1"
                    }`}
                >

                  <h2 className="inline-block px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-gray-400 mb-4">
                    {service.category}
                  </h2>
                  <h3 className="text-3xl font-bold text-white mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed mb-6 whitespace-pre-line">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {service.features.map((feature) => (
                      <span
                        key={feature}
                        className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm text-gray-300"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {/* CTA Button */}
                    <motion.button
                      onClick={() => handleOpenDrawer(service.title)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="group px-6 py-3 rounded-full bg-linear-to-r from-[#008bfd] to-secondary text-white font-medium flex items-center gap-2 shadow-lg shadow-[#00c7fd]/25 cursor-pointer"
                    >
                      Get Started
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                    {service.readMore && <Link href={`/products/${service.id}`}>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group px-6 py-3 rounded-xl bg-transparent text-white border border-white/10 hover:border-white/30 font-medium flex items-center gap-2 shadow-lg shadow-gray-500/25 cursor-pointer"
                      >
                        Read more
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </motion.button>
                    </Link>}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Service Drawer */}
      <ServiceDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        serviceTitle={selectedService}
      />
    </section>
  )
}
