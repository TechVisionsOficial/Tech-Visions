function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function smoothScrollTo(targetId: string) {
  const el = document.getElementById(targetId);
  if (!el) return;

  const headerOffset = 72;
  const startY = window.scrollY;
  const targetY = el.getBoundingClientRect().top + startY - headerOffset;
  const distance = targetY - startY;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.scrollTo(0, targetY);
    return;
  }

  // Short hops stay quick; long ones get a little more time, capped.
  const duration = Math.min(800, Math.max(350, Math.abs(distance) * 0.35));
  const startTime = performance.now();

  function step(now: number) {
    const progress = Math.min((now - startTime) / duration, 1);
    window.scrollTo(0, startY + distance * easeInOutCubic(progress));
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}
