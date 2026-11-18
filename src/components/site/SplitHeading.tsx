"use client";

import { MotionConfig, motion } from "framer-motion";
import type { ElementType } from "react";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

/**
 * A heading whose words rise out of a mask, one after another.
 * The full sentence is in the DOM from the start (screen readers and crawlers
 * read it whole); only the visual reveal is staggered.
 */
export function SplitHeading({
  text,
  as: Tag = "h1",
  className = "",
  delay = 0,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
}) {
  const words = text.split(" ");

  return (
    <MotionConfig reducedMotion="user">
      <Tag className={className} aria-label={text}>
        {words.map((word, i) => (
          <span key={`${word}-${i}`} aria-hidden className="inline-block overflow-hidden pb-[0.08em] align-bottom">
            <motion.span
              className="inline-block"
              initial={{ y: "105%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: delay + i * 0.06, ease: EASE_OUT }}
            >
              {word}
              {i < words.length - 1 ? " " : ""}
            </motion.span>
          </span>
        ))}
      </Tag>
    </MotionConfig>
  );
}
