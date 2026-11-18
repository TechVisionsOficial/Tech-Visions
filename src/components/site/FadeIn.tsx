"use client";

import { MotionConfig, motion } from "framer-motion";
import type { ReactNode } from "react";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

/** Entrance for hero content that sits under a SplitHeading: already in place, it settles. */
export function FadeIn({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        className={className}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay, ease: EASE_OUT }}
      >
        {children}
      </motion.div>
    </MotionConfig>
  );
}
