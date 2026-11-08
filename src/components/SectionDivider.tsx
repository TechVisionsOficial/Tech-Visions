// Static hairline with the brand's losango at its center. No looping motion:
// a divider is furniture, not a show.
export function SectionDivider() {
  return (
    <div aria-hidden className="mx-auto flex max-w-6xl items-center gap-4 px-6">
      <div className="h-px flex-1 bg-white/10" />
      <span className="h-1.5 w-1.5 rotate-45 border border-white/30" />
      <div className="h-px flex-1 bg-white/10" />
    </div>
  );
}
