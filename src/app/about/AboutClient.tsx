"use client"
import { SectionLabel } from '@/components/SectionLabel';
import { challenge, ourVision, whoWeAre, whyCemtrix } from '@/data/company';
import { motion } from 'framer-motion';
import { ArrowRight, Brain, Check, Eye, Globe2, Layers, Target, Users, Zap } from 'lucide-react';
import Link from 'next/link';

const fadeInUp = {
    hidden: { opacity: 0, y: 48 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: 'easeOut' as const } },
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.14, delayChildren: 0.15 } },
};

// Principles and story points only restate what the site already says (data/company.ts, data/services.ts).
// Don't add numbers, customers or claims here that aren't published elsewhere on the site.
const principles = [
    {
        icon: Target,
        title: 'Built for cement',
        description: 'AI built for cement, by people who know cement: every product is designed around how a cement plant actually runs.',
    },
    {
        icon: Users,
        title: 'People and AI, side by side',
        description: 'AI works alongside experienced people, so plant expertise is captured, shared and grown instead of lost to retirement.',
    },
    {
        icon: Layers,
        title: 'Works with what you have',
        description: 'Cemtrix AI connects to your existing SCADA and DCS systems and uses the sensors and condition reports you already have, with no new hardware.',
    },
];

const storyPoints = [
    'SMARTCEM closes workforce competency gaps and preserves critical expertise.',
    'Plant Intelligence unifies production, energy, quality and maintenance data into one source of truth.',
    'Condition Intelligence turns existing sensor data and condition reports into health scores and early warnings.',
    'Every deployment is configured to the plant’s own processes, data and priorities.',
];

export default function AboutClient() {
    return (
        <main className="relative min-h-screen overflow-hidden pt-20">
            <div className="absolute inset-0 grid-pattern" />
            <div className="absolute top-24 left-1/2 h-130 w-130 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
            <div className="absolute bottom-24 right-0 h-105 w-105 rounded-full bg-secondary/10 blur-3xl" />

            {/* Hero */}
            <section className="relative z-10 px-4 py-28 sm:px-6 lg:px-8">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    className="mx-auto max-w-5xl text-center"
                >
                    <motion.div variants={fadeInUp} className="mb-8">
                        <SectionLabel align="center">About CEMTRIX</SectionLabel>
                    </motion.div>

                    <motion.h1 variants={fadeInUp} className="mb-8 text-5xl font-bold leading-tight text-white sm:text-6xl lg:text-7xl">
                        We build AI that helps cement plants run
                        <span className="gradient-text"> smarter</span>
                    </motion.h1>

                    <motion.p variants={fadeInUp} className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-400 sm:text-xl">
                        CEMTRIX is an AI-powered industrial technology company for the cement industry. We turn
                        plant data and hard-won expertise into intelligent systems that strengthen your workforce,
                        optimise operations and keep critical equipment running.
                    </motion.p>
                </motion.div>
            </section>

            {/* Who we are */}
            <section className="relative z-10 px-4 pb-24 sm:px-6 lg:px-8">
                <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                    >
                        <motion.div variants={fadeInUp}>
                            <SectionLabel>{whoWeAre.label}</SectionLabel>
                        </motion.div>
                        <motion.h2 variants={fadeInUp} className="mt-4 text-4xl font-bold text-white sm:text-5xl">
                            AI built for cement, <span className="gradient-text">by people who know cement</span>
                        </motion.h2>
                        <motion.p variants={fadeInUp} className="mt-6 text-lg leading-relaxed text-gray-400">
                            {whoWeAre.description}
                        </motion.p>
                        <motion.p
                            variants={fadeInUp}
                            className="mt-8 rounded-2xl border border-white/10 bg-white/3 p-5 text-gray-300"
                        >
                            <strong className="font-semibold text-white">{whoWeAre.tailored.lead}</strong>{' '}
                            {whoWeAre.tailored.text}
                        </motion.p>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="grid gap-4"
                    >
                        {whoWeAre.stats.map((stat) => (
                            <motion.div
                                key={stat.label}
                                variants={fadeInUp}
                                className="flex items-center gap-6 rounded-3xl border border-white/10 bg-dark-card/45 p-6"
                            >
                                <div className="gradient-text w-24 shrink-0 text-5xl font-bold">{stat.value}</div>
                                <p className="text-gray-300">{stat.label}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Mission */}
            <section className="relative z-10 px-4 pb-24 sm:px-6 lg:px-8">
                <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="relative overflow-hidden rounded-4xl border border-white/10 bg-dark-card/50 p-8"
                    >
                        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
                        <div className="relative">
                            <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-primary to-secondary">
                                <Brain className="h-8 w-8 text-white" />
                            </div>
                            <h2 className="mb-4 text-3xl font-bold text-white">Our mission</h2>
                            <p className="text-gray-400 leading-relaxed">
                                To help cement plants meet the pressures they face today by combining AI with deep
                                cement-industry expertise, strengthening workforce capability, operational
                                performance and asset reliability.
                            </p>
                        </div>
                    </motion.div>

                    {/* The pressures from the home page "Challenge" section, in place of the old template stats. */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="grid gap-4 sm:grid-cols-2"
                    >
                        {challenge.pressures.map((pressure) => (
                            <motion.div key={pressure.title} variants={fadeInUp} className="rounded-3xl border border-white/10 bg-white/3 p-6">
                                <div className="gradient-text mb-2 text-xl font-bold">{pressure.title}</div>
                                <p className="text-sm text-gray-400">{pressure.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Vision */}
            <section className="relative z-10 px-4 pb-24 sm:px-6 lg:px-8">
                <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="relative overflow-hidden rounded-4xl border border-white/10 bg-dark-card/50 p-8 lg:order-2"
                    >
                        <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-secondary/20 blur-3xl" />
                        <div className="relative">
                            <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-secondary to-primary">
                                <Eye className="h-8 w-8 text-white" />
                            </div>
                            <h2 className="mb-4 text-3xl font-bold text-white">{ourVision.heading}</h2>
                            <p className="text-gray-400 leading-relaxed">{ourVision.statement}</p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="grid gap-4 sm:grid-cols-2 lg:order-1"
                    >
                        {ourVision.pillars.map((pillar) => (
                            <motion.div key={pillar.title} variants={fadeInUp} className="rounded-3xl border border-white/10 bg-white/3 p-6">
                                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-primary">
                                    <pillar.icon className="h-5 w-5" />
                                </div>
                                <h3 className="mb-2 text-lg font-bold text-white">{pillar.title}</h3>
                                <p className="text-sm leading-relaxed text-gray-400">{pillar.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Why CEMTRIX */}
            <section className="relative z-10 px-4 py-24 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="mb-14 max-w-3xl"
                    >
                        <motion.div variants={fadeInUp}>
                            <SectionLabel>{whyCemtrix.label}</SectionLabel>
                        </motion.div>
                        <motion.h2 variants={fadeInUp} className="mt-4 text-4xl font-bold text-white sm:text-5xl">
                            {whyCemtrix.heading}
                        </motion.h2>
                    </motion.div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {whyCemtrix.items.map((item, index) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.08 }}
                                whileHover={{ y: -8 }}
                                className="rounded-3xl border border-white/10 bg-dark-card/45 p-8 transition-colors hover:border-white/20"
                            >
                                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-primary">
                                    <item.icon className="h-6 w-6" />
                                </div>
                                <h3 className="mb-3 text-xl font-bold text-white">{item.title}</h3>
                                <p className="leading-relaxed text-gray-400">{item.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Principles */}
            <section className="relative z-10 px-4 py-24 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="mb-14 max-w-3xl"
                    >
                        <motion.div variants={fadeInUp}>
                            <SectionLabel>How we think</SectionLabel>
                        </motion.div>
                        <motion.h2 variants={fadeInUp} className="mt-4 text-4xl font-bold text-white sm:text-5xl">
                            AI that works the way a cement plant runs.
                        </motion.h2>
                    </motion.div>

                    <div className="grid gap-6 md:grid-cols-3">
                        {principles.map((principle, index) => (
                            <motion.div
                                key={principle.title}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.12 }}
                                whileHover={{ y: -8 }}
                                className="rounded-3xl border border-white/10 bg-dark-card/45 p-8 transition-colors hover:border-white/20"
                            >
                                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-primary">
                                    <principle.icon className="h-6 w-6" />
                                </div>
                                <h3 className="mb-3 text-xl font-bold text-white">{principle.title}</h3>
                                <p className="leading-relaxed text-gray-400">{principle.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Story */}
            {/* TODO: expand with the real CEMTRIX story (when and why it was founded, the team's
                background, plants and regions served). This neutral version only restates existing site content. */}
            <section className="relative z-10 px-4 py-24 sm:px-6 lg:px-8">
                <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-start">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <SectionLabel>Our story</SectionLabel>
                        <h2 className="mt-4 text-4xl font-bold text-white sm:text-5xl">Built around how a cement plant actually runs.</h2>
                        <p className="mt-6 leading-relaxed text-gray-400">
                            Cement plants face the same pressures everywhere: experienced people retire faster
                            than their knowledge can be passed on, energy and raw-material costs leave little room
                            for inefficiency, unexpected failures stop production, and plant data sits in
                            disconnected systems instead of driving timely action.
                        </p>
                        <p className="mt-4 leading-relaxed text-gray-400">
                            Cemtrix AI was built to close these gaps. It combines AI, machine learning and deep
                            cement-industry expertise in three integrated products, powered by the proprietary
                            CEMTRIX AI Engine.
                        </p>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="space-y-4"
                    >
                        {storyPoints.map((point) => (
                            <motion.div key={point} variants={fadeInUp} className="flex gap-4 rounded-2xl border border-white/10 bg-white/3 p-5">
                                <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/15">
                                    <Check className="h-4 w-4 text-green-400" />
                                </div>
                                <p className="text-gray-300">{point}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* CTA */}
            <section className="relative z-10 px-4 py-28 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mx-auto max-w-5xl overflow-hidden rounded-4xl border border-white/10 bg-linear-to-br from-primary/20 via-secondary/15 to-accent/10 p-10 text-center sm:p-14"
                >
                    <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                        <Zap className="h-7 w-7 text-white" />
                    </div>
                    <h2 className="mb-4 text-4xl font-bold text-white sm:text-5xl">Ready to bring AI into your cement plant?</h2>
                    <p className="mx-auto mb-8 max-w-2xl text-gray-300">
                        Tell us about your plant&apos;s priorities. Every Cemtrix AI deployment is configured to your
                        own processes, data and goals.
                    </p>
                    <Link
                        href="/#contact"
                        className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 font-semibold text-dark transition-transform hover:scale-105"
                    >
                        Book a Call
                        <ArrowRight className="h-5 w-5" />
                    </Link>
                </motion.div>
            </section>

            <div className="sr-only">
                <Globe2 />
                <Users />
            </div>
        </main>
    );
}