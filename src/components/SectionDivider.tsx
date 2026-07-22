"use client";

import { motion } from "framer-motion";

export function SectionDivider() {
  return (
    <div className="relative mx-auto h-px w-full max-w-6xl overflow-hidden px-6">
      <div className="h-px w-full bg-white/10" />
      <motion.div
        aria-hidden
        className="absolute inset-y-0 left-0 h-px w-1/3"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(247,246,244,0.7), transparent)",
        }}
        animate={{ x: ["-100%", "400%"] }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}
