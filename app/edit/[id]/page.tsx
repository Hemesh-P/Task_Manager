import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import { getTaskById } from "@/lib/tasks";
import { editTask } from "@/app/actions";
import { StatusBadge } from "@/components/status-badge";

export default async function EditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const task = getTaskById(Number(id));

  if (!task) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-10">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Back to tasks
      </Link>

      <div className="mt-6 rounded-xl border border-border bg-card p-6 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-6">
          <div className="flex flex-col gap-1">
            <h1 className="text-lg font-semibold tracking-tight text-card-foreground">
              Edit task
            </h1>
            <p className="text-xs text-muted-foreground">
              Update the details and save your changes.
            </p>
          </div>
          <StatusBadge status={task.status} />
        </div>

        <form action={editTask} className="flex flex-col gap-4">
          <input type="hidden" name="id" value={task.id} />

          <div className="flex flex-col gap-1.5">
            <label htmlFor="title" className="field-label">
              Title
            </label>
            <input
              id="title"
              name="title"
              defaultValue={task.title}
              required
              className="field-control"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="description" className="field-label">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              defaultValue={task.description ?? ""}
              placeholder="Optional details, links or next steps"
              className="field-control resize-y"
            />
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex flex-1 flex-col gap-1.5">
              <label htmlFor="topic" className="field-label">
                Topic
              </label>
              <input
                id="topic"
                name="topic"
                defaultValue={task.topic}
                required
                className="field-control"
              />
            </div>

            <div className="flex flex-1 flex-col gap-1.5">
              <label htmlFor="due_date" className="field-label">
                Due date
              </label>
              <input
                id="due_date"
                type="date"
                name="due_date"
                defaultValue={task.due_date}
                required
                className="field-control"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 border-t border-border pt-5">
            <button type="submit" className="btn-primary">
              <Save className="size-4" aria-hidden="true" />
              Update task
            </button>
            <Link href="/" className="btn-ghost py-2">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
