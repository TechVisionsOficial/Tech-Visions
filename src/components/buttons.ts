// Shared button looks for the public site. Size (padding) stays with each caller.
// Press feedback is a small scale-down; hover only shifts color, never size.
export const primaryButton =
  "inline-flex items-center justify-center gap-2 rounded-full bg-paper text-sm font-medium text-ink transition-[transform,background-color,opacity] duration-200 ease-out-expo hover:bg-white active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60 disabled:active:scale-100";

export const secondaryButton =
  "inline-flex items-center justify-center gap-2 rounded-full border border-white/20 text-sm font-medium text-paper transition-[transform,border-color,background-color] duration-200 ease-out-expo hover:border-white/40 hover:bg-white/[0.04] active:scale-[0.97]";
