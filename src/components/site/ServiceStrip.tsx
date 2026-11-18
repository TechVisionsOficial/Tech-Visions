const ITENS = ["Sites", "Sistemas sob medida", "Inteligência artificial", "Automações", "Tráfego pago", "Meta Ads", "Google Ads", "Helpdesk", "Órbita"];

/** What the agency does, in one still line between rules. Wraps on small screens; nothing moves sideways. */
export function ServiceStrip() {
  return (
    <div className="border-y border-white/10 px-6 py-8">
      <ul className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-6 gap-y-3">
        {ITENS.map((item) => (
          <li key={item} className="flex items-center gap-3 font-display text-lg font-medium text-paper/75 sm:text-xl">
            <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-paper/35" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
