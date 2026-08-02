import Link from "next/link";
import { Archive, CalendarDays, Pencil, Tag, TriangleAlert } from "lucide-react";
import { archiveTaskAction } from "@/app/actions";
import type { Task } from "@/lib/tasks";
import { dueLabel, formatDate, formatTimestamp, todayIso } from "@/lib/format";
import { StatusBadge } from "@/components/status-badge";

export function TaskCard({
  task,
  archived = false,
}: {
  task: Task;
  archived?: boolean;
}) {
  const overdue =
    !archived && task.status !== "complete" && task.due_date < todayIso();

  return (
    <article
      className={`group relative flex flex-col gap-3 rounded-xl border bg-card p-4 shadow-xs transition-colors sm:p-5 ${
        overdue ? "border-danger/40" : "border-border"
      } ${archived ? "opacity-70" : "hover:border-ring/40"}`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h3
          className={`text-base font-semibold leading-snug text-pretty ${
            task.status === "complete"
              ? "text-muted-foreground line-through decoration-muted-foreground/50"
              : "text-card-foreground"
          }`}
        >
          {task.title}
        </h3>
        <StatusBadge status={task.status} />
      </div>

      {task.description ? (
        <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
          {task.description}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="inline-flex items-center gap-1.5 rounded-md bg-muted px-2 py-1 font-medium text-muted-foreground">
          <Tag className="size-3.5" aria-hidden="true" />
          {task.topic}
        </span>

        <span
          className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 font-medium ${
            overdue
              ? "bg-danger/15 text-danger"
              : "bg-muted text-muted-foreground"
          }`}
        >
          {overdue ? (
            <TriangleAlert className="size-3.5" aria-hidden="true" />
          ) : (
            <CalendarDays className="size-3.5" aria-hidden="true" />
          )}
          {formatDate(task.due_date)}
        </span>

        {archived ? (
          <span className="inline-flex items-center gap-1.5 rounded-md bg-muted px-2 py-1 font-medium text-muted-foreground">
            <Archive className="size-3.5" aria-hidden="true" />
            Archived {formatTimestamp(task.archived_at)}
          </span>
        ) : (
          <span
            className={overdue ? "font-medium text-danger" : "text-muted-foreground"}
          >
            {dueLabel(task.due_date)}
          </span>
        )}
      </div>

      {!archived && (
        <div className="flex items-center gap-2 border-t border-border pt-3">
          <Link href={`/edit/${task.id}`} className="btn-ghost">
            <Pencil className="size-3.5" aria-hidden="true" />
            Edit
          </Link>

          <form action={archiveTaskAction}>
            <input type="hidden" name="id" value={task.id} />
            <button type="submit" className="btn-ghost">
              <Archive className="size-3.5" aria-hidden="true" />
              Archive
            </button>
          </form>
        </div>
      )}
    </article>
  );
}
