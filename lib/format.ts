const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

/** Formats a "YYYY-MM-DD" string as e.g. "4 Aug 2026". */
export function formatDate(value: string) {
  const date = new Date(`${value}T00:00:00Z`);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return dateFormatter.format(date);
}

/** Formats an SQLite timestamp ("YYYY-MM-DD HH:MM:SS") as a short date. */
export function formatTimestamp(value: string | null) {
  if (!value) {
    return "—";
  }

  return formatDate(value.split(" ")[0]);
}

export function todayIso() {
  return new Date().toISOString().split("T")[0];
}

/** Human-readable relative label for a due date, e.g. "Due in 3 days". */
export function dueLabel(dueDate: string) {
  const today = todayIso();
  const diffDays = Math.round(
    (new Date(`${dueDate}T00:00:00Z`).getTime() -
      new Date(`${today}T00:00:00Z`).getTime()) /
      86_400_000,
  );

  if (Number.isNaN(diffDays)) return "";
  if (diffDays === 0) return "Due today";
  if (diffDays === 1) return "Due tomorrow";
  if (diffDays === -1) return "1 day overdue";
  if (diffDays < 0) return `${Math.abs(diffDays)} days overdue`;
  return `Due in ${diffDays} days`;
}
