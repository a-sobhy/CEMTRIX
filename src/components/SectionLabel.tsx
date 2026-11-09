"use client";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface SectionLabelProps {
  children: ReactNode;
  /** Optional brochure-style number, e.g. "01" renders as "01 · LABEL". */
  index?: string;
  align?: "left" | "center";
  className?: string;
}

const rule = "h-0.5 w-10 rounded-full";
const draw = {
  initial: { scaleX: 0 },
  whileInView: { scaleX: 1 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
};

/**
 * Section eyebrow taken from the CEMTRIX brochure: a short blue-to-violet
 * gradient rule that draws itself in, followed by letter-spaced text.
 */
export function SectionLabel({ children, index, align = "left", className = "" }: SectionLabelProps) {
  const centered = align === "center";

  return (
    <div className={`flex items-center gap-4 ${centered ? "justify-center" : ""} ${className}`}>
      <motion.span
        aria-hidden="true"
        className={`${rule} bg-linear-to-r from-[#008bfd] to-secondary ${centered ? "origin-right" : "origin-left"}`}
        {...draw}
      />
      <span className="text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-gray-300">
        {index && <span className="gradient-text">{index} · </span>}
        {children}
      </span>
      {centered && (
        <motion.span
          aria-hidden="true"
          className={`${rule} bg-linear-to-r from-secondary to-[#008bfd] origin-left`}
          {...draw}
        />
      )}
    </div>
  );
}
