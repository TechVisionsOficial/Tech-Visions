// Shared button look for the admin. Size (padding/width) stays with each caller.
// Hover darkens slightly, press scales down, disabled stops both.
export const buttonPrimary =
  "inline-flex items-center justify-center gap-2 rounded-full bg-ink text-sm font-medium text-paper transition-[transform,background-color,opacity] duration-150 ease-out-expo hover:bg-[#333331] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-ink disabled:active:scale-100";
