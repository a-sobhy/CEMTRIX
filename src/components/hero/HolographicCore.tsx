import { motion } from "framer-motion";

const icons = [
    {
        name: "ppl",
        src: "/assets/hero-icons/ppl.png",
    },
    {
        name: "assets",
        src: "/assets/hero-icons/brain.png",
    },
    {
        name: "performance",
        src: "/assets/hero-icons/performance.png",
    },
    {
        name: "industry",
        src: "/assets/hero-icons/industry.png",
    },
];

export default function HolographicCore() {
    return (
        <div className="relative flex items-center justify-center w-64 h-64 sm:w-80 sm:h-80">
            {/* Outer Glow */}
            <div className="absolute inset-0 rounded-full bg-primary/20 blur-[80px] animate-pulse" />

            {/* Rotating Rings */}
            {icons.map((icon, i) => {
                const rotationDuration = 20 + i * 5;
                return (
                    <motion.div
                        key={i}
                        className="absolute inset-0 rounded-full border border-white/10"
                        style={{
                            boxShadow: "0 0 30px rgba(99, 102, 241, 0.1) inset",
                        }}
                        animate={{
                            rotate: 360,
                            scale: [0.8, 0.85, 0.8],
                            borderColor: [
                                "rgba(99, 102, 241, 0.1)",
                                "rgba(139, 92, 246, 0.3)",
                                "rgba(99, 102, 241, 0.1)",
                            ],
                        }}
                        transition={{
                            rotate: { duration: rotationDuration, repeat: Infinity, ease: "linear" },
                            scale: { duration: 4 + i, repeat: Infinity, ease: "easeInOut" },
                            borderColor: { duration: 4, repeat: Infinity },
                        }}
                    >
                        {/* Image Icon on the ring */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <motion.div
                                className="w-14 h-14 rounded-xl bg-dark-card/80 flex items-center justify-center shadow-lg shadow-primary/20 backdrop-blur-sm"
                                animate={{
                                    rotate: -360,
                                }}
                                transition={{
                                    duration: rotationDuration,
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                            >
                                <img
                                    src={icon.src}
                                    alt={icon.name}
                                    className="w-full h-full object-contain"
                                />
                            </motion.div>
                        </div>

                        {/* Subtle dot on the opposite side */}
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full bg-secondary/50 shadow-[0_0_8px_rgba(139,92,246,0.5)]" />
                    </motion.div>
                );
            })}

            {/* Central Orb */}
            <motion.div
                className="relative w-24 h-24 rounded-full bg-linear-to-br from-primary via-secondary to-accent"
                animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                style={{ boxShadow: "0 0 60px rgba(99, 102, 241, 0.6)" }}
            >
                <div className="absolute inset-0 rounded-full bg-white/20 blur-md" />
            </motion.div>

            {/* Scanning Line */}
            <motion.div
                className="absolute w-full h-px bg-linear-to-r from-transparent via-accent to-transparent"
                animate={{ top: ["0%", "100%", "0%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                style={{ opacity: 0.5 }}
            />
        </div>
    );
}
