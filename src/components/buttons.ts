// Letreiro buttons: squared plates set in sign lettering. Size stays with the caller.
// Press feedback is a small scale-down; hover only shifts the plate's tone.
const base =
  "inline-flex items-center justify-center gap-2 rounded-[3px] font-display text-lg font-extrabold uppercase leading-none tracking-[0.04em] transition-[transform,background-color,color,border-color] duration-200 ease-out-expo active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60 disabled:active:scale-100";

/** Ink plate, for paper surfaces (the letreiro, the balcão). */
export const buttonInk = `${base} bg-ink text-paper hover:bg-steel-light`;

/** Paper plate, for steel and dark surfaces. */
export const buttonPaper = `${base} bg-paper text-ink hover:bg-white`;

/** Outlined plate on dark surfaces. */
export const buttonOutline = `${base} border-2 border-paper/40 text-paper hover:border-paper hover:bg-paper/[0.06]`;
