"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Benefits } from "@/components/Benefits";
import { ServiceDrawer } from "@/components/ServiceDrawer";
import { services } from "@/data/services";

export default function ProductDetailsPage() {
    const router = useRouter();
    const { id } = useParams<{ id: string }>();

    const service = services.find((s) => s.id === id);

    const [drawerOpen, setDrawerOpen] = useState(false);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "instant",
        });
    }, [id]);

    if (!service) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-dark text-white">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">
                        Service Not Found
                    </h1>

                    <button
                        onClick={() => router.push("/")}
                        className="flex items-center gap-2 mx-auto text-primary hover:underline"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <main className="relative min-h-screen overflow-hidden pt-20">
            <div className="bg-dark text-white pb-20">
                <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Back Button */}
                    <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        onClick={() => router.back()}
                        className="group flex items-center gap-2 mb-12 text-gray-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        Back to Services
                    </motion.button>

                    <div className="grid lg:grid-cols-2 gap-16 items-start">
                        {/* Left */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="inline-block px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-gray-400 mb-6">
                                {service.category}
                            </div>

                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8">
                                {service.title}
                            </h1>

                            <p className="text-gray-400 mb-10">
                                {service.fullDescription}
                            </p>

                            <div className="mt-10">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setDrawerOpen(true)}
                                    className="group flex items-center gap-2 px-8 py-4 rounded-full bg-linear-to-r from-primary to-secondary text-white font-bold shadow-lg shadow-primary/25"
                                >
                                    Get Started

                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </motion.button>
                            </div>
                        </motion.div>

                        {/* Right */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                                duration: 0.6,
                                delay: 0.2,
                            }}
                        >
                            <div className="relative overflow-hidden p-8 rounded-[2.5rem] bg-dark-card/40 border border-white/10 shadow-2xl group">
                                <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <service.Visual />
                            </div>

                            <div className="mt-10 flex flex-wrap gap-3 justify-center lg:justify-start">
                                {service.features.map((feature, index) => (
                                    <span
                                        key={index}
                                        className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-400"
                                    >
                                        {feature}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                    {service.benefits &&
                        <div className="mt-30">
                            <Benefits
                                items={service.detailedBenefits}
                                title={`${service.category} Insights`}
                                subtitle="How It Powers Your Performance"
                                description={`The key metrics where ${service.title} delivers immediate business value.`}
                            />
                        </div>
                    }
                </div>

                <ServiceDrawer
                    isOpen={drawerOpen}
                    onClose={() => setDrawerOpen(false)}
                    serviceTitle={service.title}
                />
            </div>
        </main>
    );
}