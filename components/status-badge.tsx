import { Circle, CircleCheck, LoaderCircle } from "lucide-react";
import type { Task } from "@/lib/tasks";

const config: Record<
  Task["status"],
  { label: string; className: string; Icon: typeof Circle }
> = {
  todo: {
    label: "To do",
    className: "border-border bg-muted text-muted-foreground",
    Icon: Circle,
  },
  in_progress: {
    label: "In progress",
    className: "border-warning/40 bg-warning/15 text-warning",
    Icon: LoaderCircle,
  },
  complete: {
    label: "Complete",
    className: "border-primary/40 bg-primary/12 text-primary",
    Icon: CircleCheck,
  },
};

export function StatusBadge({ status }: { status: Task["status"] }) {
  const { label, className, Icon } = config[status] ?? config.todo;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${className}`}
    >
      <Icon className="size-3.5" aria-hidden="true" />
      {label}
    </span>
  );
}
