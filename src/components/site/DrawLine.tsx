"use client";

import { MotionConfig, motion } from "framer-motion";

/** A hairline that draws itself left to right the first time it scrolls into view. */
export function DrawLine({ className = "" }: { className?: string }) {
  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        aria-hidden
        className={`h-px origin-left bg-white/15 ${className}`}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      />
    </MotionConfig>
  );
}
