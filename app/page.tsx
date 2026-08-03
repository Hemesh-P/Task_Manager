import { Archive, CheckCircle2, ListTodo } from "lucide-react";
import { getTasks, getArchivedTasks } from "@/lib/tasks";
import { NewTaskForm } from "@/components/new-task-form";
import { SortControl } from "@/components/sort-control";
import { TaskCard } from "@/components/task-card";
import { EmptyState } from "@/components/empty-state";
import type { Task } from "@/lib/tasks";

const STATUS_LABELS: Record<Task["status"], string> = {
  todo: "To do",
  in_progress: "In progress",
  complete: "Complete",
};

function groupTasks(tasks: Task[], sort: string) {
  if (sort === "status") {
    const order: Task["status"][] = ["todo", "in_progress", "complete"];
    return order
      .map((status) => ({
        key: status,
        label: STATUS_LABELS[status],
        tasks: tasks.filter((task) => task.status === status),
      }))
      .filter((group) => group.tasks.length > 0);
  }

  if (sort === "topic") {
    const groups: { key: string; label: string; tasks: Task[] }[] = [];
    for (const task of tasks) {
      const last = groups[groups.length - 1];
      if (last && last.key === task.topic) {
        last.tasks.push(task);
      } else {
        groups.push({ key: task.topic, label: task.topic, tasks: [task] });
      }
    }
    return groups;
  }

  return null;
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ sort?: string }>;
}) {
  const params = await searchParams;
  const sort = params.sort ?? "due_date";

  const tasks = getTasks(sort);
  const archivedTasks = getArchivedTasks();
  const groupedTasks = groupTasks(tasks, sort);

  return (
    <div className="flex min-h-full flex-col">
      <header className="border-b border-border bg-card/60 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-5">
          <div className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <ListTodo className="size-5" aria-hidden="true" />
            </span>
            <div className="flex flex-col">
              <h1 className="text-base font-semibold tracking-tight text-foreground">
                Task Manager
              </h1>
              <p className="text-xs text-muted-foreground">
                {tasks.length} active {tasks.length === 1 ? "task" : "tasks"}
                {archivedTasks.length > 0
                  ? ` · ${archivedTasks.length} archived`
                  : ""}
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          <div className="w-full lg:sticky lg:top-8 lg:w-[22rem] lg:shrink-0">
            <NewTaskForm />
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-10">
            <section aria-labelledby="active-heading" className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2
                  id="active-heading"
                  className="text-sm font-semibold text-foreground"
                >
                  Active tasks
                  <span className="ml-2 rounded-md bg-muted px-1.5 py-0.5 text-xs font-medium text-muted-foreground">
                    {tasks.length}
                  </span>
                </h2>
                <SortControl sort={sort} />
              </div>

              {tasks.length === 0 ? (
                <EmptyState
                  icon={CheckCircle2}
                  title="Nothing on your plate"
                  description="You're all caught up. Create a task with the form on the left to get started."
                />
              ) : groupedTasks ? (
                <div className="flex flex-col gap-6">
                  {groupedTasks.map((group) => (
                    <div key={group.key} className="flex flex-col gap-3">
                      <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        {group.label}
                        <span className="rounded-md bg-muted px-1.5 py-0.5 text-xs font-medium text-muted-foreground">
                          {group.tasks.length}
                        </span>
                      </h3>
                      <div className="flex flex-col gap-3">
                        {group.tasks.map((task) => (
                          <TaskCard key={task.id} task={task} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {tasks.map((task) => (
                    <TaskCard key={task.id} task={task} />
                  ))}
                </div>
              )}
            </section>

            <section
              aria-labelledby="archived-heading"
              className="flex flex-col gap-4"
            >
              <h2
                id="archived-heading"
                className="flex items-center gap-2 text-sm font-semibold text-foreground"
              >
                <Archive className="size-4 text-muted-foreground" aria-hidden="true" />
                Archived
                <span className="rounded-md bg-muted px-1.5 py-0.5 text-xs font-medium text-muted-foreground">
                  {archivedTasks.length}
                </span>
              </h2>

              {archivedTasks.length === 0 ? (
                <EmptyState
                  icon={Archive}
                  title="No archived tasks yet"
                  description="Tasks you archive will be kept here for reference."
                  compact
                />
              ) : (
                <div className="flex flex-col gap-3">
                  {archivedTasks.map((task) => (
                    <TaskCard key={task.id} task={task} archived />
                  ))}
                </div>
              )}
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
