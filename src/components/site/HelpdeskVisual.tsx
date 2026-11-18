/** Static stack of ticket cards: the helpdesk's face on product cards. Fictional content. */
export function HelpdeskVisual() {
  const tickets = [
    { id: "#1044", title: "Dúvida sobre a fatura", status: "Aberto", style: "border border-white/30 text-paper/80" },
    { id: "#1043", title: "Troca de produto", status: "Em andamento", style: "bg-white/15 text-paper" },
    { id: "#1042", title: "Pedido não entregue", status: "Resolvido", style: "bg-paper text-ink" },
  ];
  return (
    <div aria-hidden className="relative flex h-full min-h-56 flex-col justify-center gap-3 overflow-hidden rounded-xl border border-white/10 bg-[#202020] p-5">
      {tickets.map((t, i) => (
        <div
          key={t.id}
          className="rounded-lg border border-white/10 bg-white/[0.04] p-3.5"
          style={{ marginLeft: `${i * 6}%`, marginRight: `${(2 - i) * 6}%` }}
        >
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs tabular-nums text-paper/45">Chamado {t.id}</span>
            <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${t.style}`}>{t.status}</span>
          </div>
          <p className="mt-1.5 text-sm font-medium text-paper/90">{t.title}</p>
        </div>
      ))}
    </div>
  );
}
