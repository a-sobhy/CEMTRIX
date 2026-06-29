"use client"
import { motion } from 'framer-motion';
import { ArrowRight, Brain, Check, Globe2, Layers, Shield, Sparkles, Target, Users, Zap } from 'lucide-react';
import Link from 'next/link';

const fadeInUp = {
    hidden: { opacity: 0, y: 48 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: 'easeOut' as const } },
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.14, delayChildren: 0.15 } },
};

const principles = [
    {
        icon: Target,
        title: 'Outcome-first automation',
        description: "Every workflow starts with measurable business value, not technology for technology's sake.",
    },
    {
        icon: Shield,
        title: 'Human-safe AI',
        description: 'We design approvals, guardrails, and audit trails so teams stay in control of every critical action.',
    },
    {
        icon: Layers,
        title: 'Built into your stack',
        description: 'cemtrix connects with your CRM, inbox, support tools, data warehouse, and internal systems.',
    },
];

const milestones = [
    'Mapped 500+ business workflows across sales, operations, support, and marketing.',
    'Built automation systems that save teams thousands of manual hours every month.',
    'Created deployable AI assistants for lead routing, support triage, research, and reporting.',
    'Helped teams scale faster without adding operational complexity.',
];

export default function AboutPage() {
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
                    <motion.div
                        variants={fadeInUp}
                        className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2"
                    >
                        <Sparkles className="h-4 w-4 text-accent" />
                        <span className="text-sm text-gray-300">About CEMTRIX</span>
                    </motion.div>

                    <motion.h1 variants={fadeInUp} className="mb-8 text-5xl font-bold leading-tight text-white sm:text-6xl lg:text-7xl">
                        We build AI systems that make work feel
                        <span className="gradient-text"> effortless</span>
                    </motion.h1>

                    <motion.p variants={fadeInUp} className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-400 sm:text-xl">
                        CEMTRIX is an AI automation studio for modern teams. We turn repetitive work,
                        scattered tools, and slow handoffs into intelligent systems that execute with speed,
                        context, and measurable impact.
                    </motion.p>
                </motion.div>
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
                                To help ambitious companies unlock compounding operational leverage with AI. We
                                do not just ship chatbots. We design complete automation loops that analyze,
                                decide, execute, and improve.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="grid gap-4 sm:grid-cols-2"
                    >
                        {[
                            { label: 'Automations shipped', value: '100+' },
                            { label: 'Businesses supported', value: '50+' },
                            { label: 'Workflow categories', value: '18' },
                            { label: 'Support coverage', value: '24/7' },
                        ].map((item) => (
                            <motion.div key={item.label} variants={fadeInUp} className="rounded-3xl border border-white/10 bg-white/3 p-6">
                                <div className="gradient-text mb-2 text-4xl font-bold">{item.value}</div>
                                <p className="text-sm text-gray-400">{item.label}</p>
                            </motion.div>
                        ))}
                    </motion.div>
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
                        <motion.span variants={fadeInUp} className="text-sm font-semibold uppercase tracking-wider text-primary">
                            How we think
                        </motion.span>
                        <motion.h2 variants={fadeInUp} className="mt-4 text-4xl font-bold text-white sm:text-5xl">
                            Automation should feel invisible, reliable, and deeply useful.
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
            <section className="relative z-10 px-4 py-24 sm:px-6 lg:px-8">
                <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-start">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <span className="text-sm font-semibold uppercase tracking-wider text-accent">Our story</span>
                        <h2 className="mt-4 text-4xl font-bold text-white sm:text-5xl">Built for the new operating system of business.</h2>
                        <p className="mt-6 leading-relaxed text-gray-400">
                            We started CEMTRIX after seeing the same pattern across fast-growing teams: great
                            people were spending too much time moving data, chasing approvals, writing the same
                            responses, and rebuilding the same reports. AI changed what was possible, but most
                            companies needed a partner to turn possibility into production-grade systems.
                        </p>
                        <p className="mt-4 leading-relaxed text-gray-400">
                            Today, CEMTRIX combines strategy, engineering, and AI product design to create
                            automations that work inside the tools teams already use.
                        </p>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="space-y-4"
                    >
                        {milestones.map((milestone) => (
                            <motion.div key={milestone} variants={fadeInUp} className="flex gap-4 rounded-2xl border border-white/10 bg-white/3 p-5">
                                <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/15">
                                    <Check className="h-4 w-4 text-green-400" />
                                </div>
                                <p className="text-gray-300">{milestone}</p>
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
                    <h2 className="mb-4 text-4xl font-bold text-white sm:text-5xl">Ready to automate what slows you down?</h2>
                    <p className="mx-auto mb-8 max-w-2xl text-gray-300">
                        Tell us where your team loses time. We will map the highest-leverage AI automation opportunities.
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