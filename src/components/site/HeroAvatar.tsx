"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";

// The avatar's rendered scenes, played back to back: the site appearing,
// the layout and the chart, then the light trails. 8 s each, 720x1280.
const CENAS = ["/avatar/cena-2.mp4", "/avatar/cena-3.mp4", "/avatar/cena-4.mp4"];
const FADE_MS = 700;

/**
 * The Tech Visions avatar in the hero. Two stacked videos take turns so each
 * scene crossfades into the next; the figure leans toward the pointer for depth.
 * Plays only while on screen. With reduced motion it is a still frame.
 */
export function HeroAvatar() {
  const reduceMotion = useReducedMotion();
  const frameRef = useRef<HTMLDivElement>(null);
  const videoA = useRef<HTMLVideoElement>(null);
  const videoB = useRef<HTMLVideoElement>(null);
  const [front, setFront] = useState(0); // which of the two <video> is visible
  const [scene, setScene] = useState(0); // index into CENAS shown by the front video
  const [started, setStarted] = useState(false);

  // Pointer tilt, smoothed with a spring so it never snaps.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 120, damping: 18, mass: 0.6 });
  const sy = useSpring(py, { stiffness: 120, damping: 18, mass: 0.6 });
  const rotateY = useTransform(sx, [-1, 1], [-7, 7]);
  const rotateX = useTransform(sy, [-1, 1], [5, -5]);
  const shiftX = useTransform(sx, [-1, 1], [-10, 10]);

  useEffect(() => {
    if (reduceMotion) return;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      px.set((e.clientX / window.innerWidth) * 2 - 1);
      py.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduceMotion, px, py]);

  // Play only while the hero is visible.
  useEffect(() => {
    if (reduceMotion) return;
    const el = frameRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      const v = (front === 0 ? videoA : videoB).current;
      if (!v) return;
      if (entry.isIntersecting) void v.play().catch(() => {});
      else v.pause();
    });
    io.observe(el);
    return () => io.disconnect();
  }, [front, reduceMotion]);

  // Preload the next scene into the hidden video as soon as the current one starts.
  useEffect(() => {
    if (reduceMotion) return;
    const back = (front === 0 ? videoB : videoA).current;
    if (!back) return;
    const next = CENAS[(scene + 1) % CENAS.length];
    if (!back.src.endsWith(next)) {
      back.src = next;
      back.load();
    }
  }, [front, scene, reduceMotion]);

  function handleEnded() {
    const back = (front === 0 ? videoB : videoA).current;
    if (!back) return;
    back.currentTime = 0;
    void back.play().catch(() => {});
    setFront(1 - front);
    setScene((s) => (s + 1) % CENAS.length);
  }

  return (
    <div ref={frameRef} className="relative mx-auto aspect-[9/16] w-full max-w-[420px] [perspective:1200px]">
      <motion.div
        aria-hidden
        style={reduceMotion ? undefined : { rotateX, rotateY, x: shiftX }}
        className="absolute inset-0 [transform-style:preserve-3d] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_48%,#000_62%,transparent_100%)]"
      >
        {/* Still frame: shown first, and the whole time with reduced motion. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/avatar/poster.jpg"
          alt=""
          width={720}
          height={1280}
          fetchPriority="high"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            started && !reduceMotion ? "opacity-0" : "opacity-100"
          }`}
        />
        {!reduceMotion && (
          <>
            <video
              ref={videoA}
              src={CENAS[0]}
              muted
              playsInline
              autoPlay
              preload="auto"
              onPlaying={() => setStarted(true)}
              onEnded={front === 0 ? handleEnded : undefined}
              className="absolute inset-0 h-full w-full object-cover"
              style={{ opacity: started && front === 0 ? 1 : 0, transition: `opacity ${FADE_MS}ms ease` }}
            />
            <video
              ref={videoB}
              muted
              playsInline
              preload="none"
              onEnded={front === 1 ? handleEnded : undefined}
              className="absolute inset-0 h-full w-full object-cover"
              style={{ opacity: started && front === 1 ? 1 : 0, transition: `opacity ${FADE_MS}ms ease` }}
            />
          </>
        )}
      </motion.div>
    </div>
  );
}
