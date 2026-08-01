import { getTaskById } from "@/lib/tasks";
import { editTask } from "@/app/actions";
import { notFound } from "next/navigation";

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
    <main style={{ padding: "40px" }}>
      <h1>Edit Task</h1>

      <form action={editTask}>
        <input
          type="hidden"
          name="id"
          value={task.id}
        />

        <div>
          <input
            name="title"
            defaultValue={task.title}
            required
          />
        </div>

        <div>
          <textarea
            name="description"
            defaultValue={task.description ?? ""}
          />
        </div>

        <div>
          <input
            type="date"
            name="due_date"
            defaultValue={task.due_date}
            required
          />
        </div>

        <div>
          <input
            name="topic"
            defaultValue={task.topic}
            required
          />
        </div>

        <button type="submit">
          Update Task
        </button>
      </form>
    </main>
  );
}