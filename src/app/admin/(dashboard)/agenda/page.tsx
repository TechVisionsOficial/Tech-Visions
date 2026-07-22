import Link from "next/link";
import { getUser } from "@/lib/auth/dal";
import { createClient } from "@/lib/supabase/server";
import {
  getBrazilTodayISO,
  getBrazilNowMinutes,
  getMonthRange,
  getWeekRange,
  toBrazilDateKey,
  toBrazilTimeMinutes,
} from "@/lib/date";
import { ANALYST_LABELS } from "@/lib/validation/meeting";

const WEEKDAY_LABELS = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
const MONTH_LABELS = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

const HOUR_HEIGHT = 48; // px per hour row in the week grid
const GUTTER_WIDTH = 52; // px, the hour-labels column

type Meeting = {
  id: string;
  title: string;
  starts_at: string;
  ends_at: string | null;
  analyst: string;
  clients: { company_name: string } | null;
};

function analystLabel(analyst: string) {
  return ANALYST_LABELS[analyst as keyof typeof ANALYST_LABELS] ?? analyst;
}

/** Widest hour range covering both business hours (7h–20h) and any meeting
 * that falls outside them, so nothing in the week ever renders clipped. */
function getWeekHourRange(meetings: Meeting[]) {
  let minHour = 7;
  let maxHour = 20;
  for (const m of meetings) {
    const startMin = toBrazilTimeMinutes(m.starts_at);
    let endMin = m.ends_at ? toBrazilTimeMinutes(m.ends_at) : startMin + 60;
    if (m.ends_at && toBrazilDateKey(m.ends_at) !== toBrazilDateKey(m.starts_at)) {
      endMin = 24 * 60;
    }
    minHour = Math.min(minHour, Math.floor(startMin / 60));
    maxHour = Math.max(maxHour, Math.ceil(endMin / 60));
  }
  return { minHour: Math.max(0, minHour), maxHour: Math.min(24, maxHour) };
}

function AgendaHeader({ view }: { view: "month" | "week" }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <h1 className="font-display text-2xl font-medium">Agenda</h1>
      <div className="flex items-center gap-2">
        <Link
          href="/admin/agenda"
          className={`rounded-full px-3 py-1.5 text-sm ${
            view === "month" ? "bg-ink text-paper" : "border border-ink/15 text-ink/70"
          }`}
        >
          Mês
        </Link>
        <Link
          href="/admin/agenda?view=week"
          className={`rounded-full px-3 py-1.5 text-sm ${
            view === "week" ? "bg-ink text-paper" : "border border-ink/15 text-ink/70"
          }`}
        >
          Semana
        </Link>
        <Link
          href="/admin/agenda/new"
          className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-paper"
        >
          Nova reunião
        </Link>
      </div>
    </div>
  );
}

function groupByBrazilDay(meetings: Meeting[]) {
  const byDay = new Map<string, Meeting[]>();
  for (const m of meetings) {
    const key = toBrazilDateKey(m.starts_at);
    if (!byDay.has(key)) byDay.set(key, []);
    byDay.get(key)!.push(m);
  }
  return byDay;
}

export default async function AgendaPage({
  searchParams,
}: {
  searchParams: Promise<{ view?: string; month?: string; week?: string }>;
}) {
  await getUser();
  const { view, month, week } = await searchParams;
  const today = getBrazilTodayISO();
  const supabase = await createClient();

  if (view === "week") {
    const weekAnchor = week || today;
    const { start, startOfNext, days } = getWeekRange(weekAnchor);

    const { data: meetings } = await supabase
      .from("meetings")
      .select("id, title, starts_at, ends_at, analyst, clients(company_name)")
      .gte("starts_at", `${start}T00:00:00-03:00`)
      .lt("starts_at", `${startOfNext}T00:00:00-03:00`)
      .order("starts_at", { ascending: true });

    const byDay = groupByBrazilDay((meetings as unknown as Meeting[]) ?? []);
    const { minHour, maxHour } = getWeekHourRange((meetings as unknown as Meeting[]) ?? []);
    const rowCount = maxHour - minHour;
    const gridHeight = rowCount * HOUR_HEIGHT;
    const nowMinutes = getBrazilNowMinutes();
    const showNowLine = nowMinutes >= minHour * 60 && nowMinutes <= maxHour * 60;

    const prevWeekDate = new Date(`${start}T00:00:00Z`);
    prevWeekDate.setUTCDate(prevWeekDate.getUTCDate() - 7);
    const nextWeekDate = new Date(`${start}T00:00:00Z`);
    nextWeekDate.setUTCDate(nextWeekDate.getUTCDate() + 7);
    const prevWeek = prevWeekDate.toISOString().slice(0, 10);
    const nextWeek = nextWeekDate.toISOString().slice(0, 10);

    return (
      <div>
        <AgendaHeader view="week" />
        <div className="mt-6 flex items-center justify-between">
          <Link
            href={`/admin/agenda?view=week&week=${prevWeek}`}
            className="text-sm text-ink/60 hover:text-ink"
          >
            ← Semana anterior
          </Link>
          <p className="text-sm font-medium">
            {days[0]} – {days[6]}
          </p>
          <Link
            href={`/admin/agenda?view=week&week=${nextWeek}`}
            className="text-sm text-ink/60 hover:text-ink"
          >
            Próxima semana →
          </Link>
        </div>

        <div className="mt-4 overflow-hidden rounded-xl border border-ink/10 bg-white">
          {/* Weekday header row, aligned with the hour columns below */}
          <div className="flex border-b border-ink/10">
            <div style={{ width: GUTTER_WIDTH }} className="shrink-0" />
            {days.map((day, i) => {
              const isToday = day === today;
              return (
                <div
                  key={day}
                  className={`flex-1 border-l border-ink/10 py-2 text-center ${
                    isToday ? "bg-ink/[0.03]" : ""
                  }`}
                >
                  <p className="text-xs font-medium uppercase tracking-wide text-ink/40">
                    {WEEKDAY_LABELS[i]}
                  </p>
                  <p
                    className={`mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full text-sm ${
                      isToday ? "bg-ink font-medium text-paper" : "text-ink/70"
                    }`}
                  >
                    {Number(day.slice(8, 10))}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Hour grid */}
          <div className="flex overflow-y-auto" style={{ maxHeight: 640 }}>
            <div className="relative shrink-0" style={{ width: GUTTER_WIDTH, height: gridHeight }}>
              {Array.from({ length: rowCount }, (_, i) => minHour + i).map((hour) => (
                <p
                  key={hour}
                  className="absolute right-2 -translate-y-1/2 text-[11px] text-ink/40"
                  style={{ top: (hour - minHour) * HOUR_HEIGHT }}
                >
                  {String(hour).padStart(2, "0")}h
                </p>
              ))}
            </div>
            {days.map((day) => {
              const isToday = day === today;
              const dayMeetings = byDay.get(day) ?? [];
              return (
                <div
                  key={day}
                  className="relative flex-1 border-l border-ink/10"
                  style={{ height: gridHeight, backgroundColor: isToday ? "rgba(26,26,26,0.03)" : undefined }}
                >
                  {Array.from({ length: rowCount + 1 }, (_, i) => minHour + i).map((hour) => (
                    <div
                      key={`line-${hour}`}
                      className="pointer-events-none absolute inset-x-0 border-t border-ink/10"
                      style={{ top: (hour - minHour) * HOUR_HEIGHT }}
                    />
                  ))}
                  {Array.from({ length: rowCount }, (_, i) => minHour + i).map((hour) => (
                    <Link
                      key={`slot-${hour}`}
                      href={`/admin/agenda/new?date=${day}&time=${String(hour).padStart(2, "0")}:00`}
                      className="absolute inset-x-0 block hover:bg-ink/[0.04]"
                      style={{ top: (hour - minHour) * HOUR_HEIGHT, height: HOUR_HEIGHT }}
                      aria-label={`Nova reunião em ${day} às ${hour}h`}
                    />
                  ))}
                  {dayMeetings.map((m) => {
                    const startMin = toBrazilTimeMinutes(m.starts_at);
                    let endMin = m.ends_at ? toBrazilTimeMinutes(m.ends_at) : startMin + 60;
                    if (m.ends_at && toBrazilDateKey(m.ends_at) !== day) endMin = 24 * 60;
                    if (endMin <= startMin) endMin = startMin + 30;
                    const top = ((startMin - minHour * 60) / 60) * HOUR_HEIGHT;
                    const height = Math.max(22, ((endMin - startMin) / 60) * HOUR_HEIGHT);
                    const isRichard = m.analyst === "richard";
                    return (
                      <Link
                        key={m.id}
                        href={`/admin/agenda/${m.id}`}
                        className={`absolute overflow-hidden rounded-md px-2 py-1 text-[11px] leading-tight ${
                          isRichard
                            ? "border border-ink/30 bg-white text-ink hover:bg-ink/5"
                            : "bg-ink text-paper hover:opacity-90"
                        }`}
                        style={{ top, height, left: 3, right: 3 }}
                      >
                        <p className="truncate font-medium">{m.title}</p>
                        <p className={`truncate ${isRichard ? "text-ink/50" : "text-paper/70"}`}>
                          {analystLabel(m.analyst)}
                          {m.clients?.company_name ? ` · ${m.clients.company_name}` : ""}
                        </p>
                      </Link>
                    );
                  })}
                  {isToday && showNowLine && (
                    <div
                      className="pointer-events-none absolute inset-x-0 z-20 flex items-center"
                      style={{ top: ((nowMinutes - minHour * 60) / 60) * HOUR_HEIGHT }}
                    >
                      <span className="-ml-1 h-2 w-2 shrink-0 rounded-full bg-red-500" />
                      <span className="h-px flex-1 bg-red-500" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Month view (default)
  const monthParam = month || today.slice(0, 7);
  const [yearStr, monthStr] = monthParam.split("-");
  const year = Number(yearStr);
  const monthNum = Number(monthStr);

  const { start, startOfNext } = getMonthRange(year, monthNum);

  const { data: meetings } = await supabase
    .from("meetings")
    .select("id, title, starts_at, ends_at, analyst, clients(company_name)")
    .gte("starts_at", `${start}T00:00:00-03:00`)
    .lt("starts_at", `${startOfNext}T00:00:00-03:00`)
    .order("starts_at", { ascending: true });

  const byDay = groupByBrazilDay((meetings as unknown as Meeting[]) ?? []);

  const daysInMonth = new Date(year, monthNum, 0).getDate();
  const firstWeekday = new Date(year, monthNum - 1, 1).getDay(); // 0=Sun..6=Sat
  const leadingBlanks = firstWeekday === 0 ? 6 : firstWeekday - 1; // Monday-start

  const cells: (string | null)[] = [
    ...Array(leadingBlanks).fill(null),
    ...Array.from(
      { length: daysInMonth },
      (_, i) => `${yearStr}-${monthStr}-${String(i + 1).padStart(2, "0")}`
    ),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  const prevMonthNum = monthNum === 1 ? 12 : monthNum - 1;
  const prevYear = monthNum === 1 ? year - 1 : year;
  const nextMonthNum = monthNum === 12 ? 1 : monthNum + 1;
  const nextYear = monthNum === 12 ? year + 1 : year;

  return (
    <div>
      <AgendaHeader view="month" />
      <div className="mt-6 flex items-center justify-between">
        <Link
          href={`/admin/agenda?month=${prevYear}-${String(prevMonthNum).padStart(2, "0")}`}
          className="text-sm text-ink/60 hover:text-ink"
        >
          ← Anterior
        </Link>
        <p className="font-display text-lg font-medium">
          {MONTH_LABELS[monthNum - 1]} {year}
        </p>
        <Link
          href={`/admin/agenda?month=${nextYear}-${String(nextMonthNum).padStart(2, "0")}`}
          className="text-sm text-ink/60 hover:text-ink"
        >
          Próximo →
        </Link>
      </div>

      <div className="mt-4 overflow-hidden rounded-xl border border-ink/10 bg-white">
        <div
          className="border-b border-ink/10 bg-ink/[0.02]"
          style={{ display: "grid", gridTemplateColumns: "repeat(7, minmax(0, 1fr))" }}
        >
          {WEEKDAY_LABELS.map((w, i) => (
            <div
              key={w}
              className="py-2 text-center text-xs font-medium uppercase tracking-wide text-ink/40"
              style={{ borderLeft: i === 0 ? "none" : "1px solid rgba(26,26,26,0.1)" }}
            >
              {w}
            </div>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, minmax(0, 1fr))" }}>
          {cells.map((day, i) => {
            const isLeftEdge = i % 7 === 0;
            const isTopRow = i < 7;
            const cellStyle = {
              borderLeft: isLeftEdge ? "none" : "1px solid rgba(26,26,26,0.1)",
              borderTop: isTopRow ? "none" : "1px solid rgba(26,26,26,0.1)",
            };
            if (!day) {
              return (
                <div
                  key={`blank-${i}`}
                  className="min-h-[96px] bg-ink/[0.01]"
                  style={cellStyle}
                />
              );
            }
            const dayMeetings = byDay.get(day) ?? [];
            const isToday = day === today;
            return (
              <div key={day} className="min-h-[96px] p-2" style={cellStyle}>
                <div className="flex items-center justify-between">
                  <p
                    className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs ${
                      isToday ? "bg-ink font-medium text-paper" : "text-ink/50"
                    }`}
                  >
                    {Number(day.slice(8, 10))}
                  </p>
                  <Link
                    href={`/admin/agenda/new?date=${day}`}
                    className="px-1 text-sm leading-none text-ink/25 hover:text-ink/70"
                    aria-label={`Nova reunião em ${day}`}
                  >
                    +
                  </Link>
                </div>
                <div className="mt-1 flex flex-col gap-1">
                  {dayMeetings.slice(0, 2).map((m) => (
                    <Link
                      key={m.id}
                      href={`/admin/agenda/${m.id}`}
                      className="flex items-center gap-1 truncate rounded bg-ink/5 px-1.5 py-1 text-[11px] hover:bg-ink/10"
                    >
                      <span
                        className={`inline-block h-1.5 w-1.5 shrink-0 rounded-full ${
                          m.analyst === "richard" ? "border border-ink/50" : "bg-ink/70"
                        }`}
                      />
                      <span className="truncate">{m.title}</span>
                    </Link>
                  ))}
                  {dayMeetings.length > 2 && (
                    <p className="text-[11px] text-ink/40">
                      +{dayMeetings.length - 2} mais
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
