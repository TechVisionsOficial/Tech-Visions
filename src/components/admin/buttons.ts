// Shared button for the admin: a squared ink plate, like the site's letreiro.
// Size (padding/width) stays with each caller. Hover lifts the tone, press scales down.
export const buttonPrimary =
  "inline-flex items-center justify-center gap-2 rounded-[3px] bg-ink text-sm font-medium text-paper transition-[transform,background-color,opacity] duration-150 ease-out-expo hover:bg-steel-light active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-ink disabled:active:scale-100";
