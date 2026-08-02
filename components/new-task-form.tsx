import { Plus } from "lucide-react";
import { addTask } from "@/app/actions";

export function NewTaskForm() {
  return (
    <section
      aria-labelledby="new-task-heading"
      className="rounded-xl border border-border bg-card p-5 shadow-xs"
    >
      <div className="flex flex-col gap-1 pb-4">
        <h2
          id="new-task-heading"
          className="text-sm font-semibold text-card-foreground"
        >
          New task
        </h2>
        <p className="text-xs leading-relaxed text-muted-foreground">
          Add a task with a topic and a due date to keep it on your radar.
        </p>
      </div>

      <form action={addTask} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="title" className="field-label">
            Title
          </label>
          <input
            id="title"
            type="text"
            name="title"
            placeholder="Write the lab report"
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
            rows={3}
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
              type="text"
              name="topic"
              placeholder="Coursework"
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
              required
              className="field-control"
            />
          </div>
        </div>

        <button type="submit" className="btn-primary mt-1 w-full">
          <Plus className="size-4" aria-hidden="true" />
          Create task
        </button>
      </form>
    </section>
  );
}
