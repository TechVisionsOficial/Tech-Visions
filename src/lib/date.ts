/** "Today" as YYYY-MM-DD in America/Sao_Paulo — the single source of truth for
 * "which month/week is this" and "is this overdue" everywhere in the app, so
 * SQL-side current_date and JS-side new Date() never disagree near midnight. */
export function getBrazilTodayISO(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Sao_Paulo" }).format(
    new Date()
  );
}

/** [start, startOfNext) as YYYY-MM-DD strings for a given year/month (1-12) —
 * an exclusive-upper-bound date range, avoiding ever constructing an invalid
 * date like "2026-02-31". */
export function getMonthRange(year: number, month: number) {
  const start = `${year}-${String(month).padStart(2, "0")}-01`;
  const nextMonth = month === 12 ? 1 : month + 1;
  const nextYear = month === 12 ? year + 1 : year;
  const startOfNext = `${nextYear}-${String(nextMonth).padStart(2, "0")}-01`;
  return { start, startOfNext };
}

/** Current month range, derived from getBrazilTodayISO(). */
export function getCurrentMonthRange() {
  const todayISO = getBrazilTodayISO();
  const year = Number(todayISO.slice(0, 4));
  const month = Number(todayISO.slice(5, 7));
  const { start, startOfNext } = getMonthRange(year, month);
  return { startOfMonth: start, startOfNextMonth: startOfNext };
}

/** Converts an absolute instant (timestamptz ISO string) to its America/Sao_Paulo
 * calendar date (YYYY-MM-DD). Use this — never the server's ambient local
 * timezone (e.g. `new Date(iso).getDate()`) — to group meetings/events by day,
 * since a deployed server's local timezone is not guaranteed to be Brazil's. */
export function toBrazilDateKey(iso: string): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Sao_Paulo" }).format(
    new Date(iso)
  );
}

/** Converts an absolute instant (timestamptz ISO string) to its America/Sao_Paulo
 * time-of-day, as minutes since midnight — used to position events in the week
 * calendar grid regardless of the server's ambient timezone. */
export function toBrazilTimeMinutes(iso: string): number {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "America/Sao_Paulo",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(new Date(iso));
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? "0");
  const minute = Number(parts.find((p) => p.type === "minute")?.value ?? "0");
  return hour * 60 + minute;
}

/** Current time-of-day in America/Sao_Paulo, as minutes since midnight —
 * used to position the "now" line in the week calendar grid. */
export function getBrazilNowMinutes(): number {
  return toBrazilTimeMinutes(new Date().toISOString());
}

/** [start, startOfNext) for a Monday-start week containing the given date
 * (YYYY-MM-DD). Brazilian/ISO convention — segunda a domingo, not Sunday-start. */
export function getWeekRange(dateISO: string) {
  const [y, m, d] = dateISO.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  const weekday = date.getUTCDay(); // 0=Sun..6=Sat
  const diffToMonday = weekday === 0 ? -6 : 1 - weekday;

  const monday = new Date(date);
  monday.setUTCDate(monday.getUTCDate() + diffToMonday);

  const days: string[] = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(monday);
    day.setUTCDate(day.getUTCDate() + i);
    days.push(day.toISOString().slice(0, 10));
  }

  const startOfNext = new Date(monday);
  startOfNext.setUTCDate(startOfNext.getUTCDate() + 7);

  return {
    start: days[0],
    startOfNext: startOfNext.toISOString().slice(0, 10),
    days,
  };
}
