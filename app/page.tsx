import Link from "next/link";
import { addTask, archiveTaskAction } from "./actions";
import { getTasks, getArchivedTasks } from "@/lib/tasks";

export default function Home() {
  const tasks = getTasks();
  const archivedTasks = getArchivedTasks();

  return (
    <main style={{ padding: "40px" }}>
      <h1>Task Manager</h1>

      <form action={addTask}>
        <div>
          <input
            type="text"
            name="title"
            placeholder="Title"
            required
          />
        </div>

        <br />

        <div>
          <textarea
            name="description"
            placeholder="Description"
          />
        </div>

        <br />

        <div>
          <input
            type="date"
            name="due_date"
            required
          />
        </div>

        <br />

        <div>
          <input
            type="text"
            name="topic"
            placeholder="Topic"
            required
          />
        </div>

        <br />

        <button type="submit">
          Create Task
        </button>
      </form>

      <hr />

      <h2>Active Tasks</h2>

      {tasks.length === 0 && (
        <p>No active tasks.</p>
      )}

      {tasks.map((task) => (
        <div
          key={task.id}
          style={{
            border: "1px solid grey",
            padding: "10px",
            marginBottom: "15px",
          }}
        >
          <h3>{task.title}</h3>

          <p>{task.description}</p>

          <p>
            <strong>Topic:</strong> {task.topic}
          </p>

          <p>
            <strong>Due:</strong> {task.due_date}
          </p>

          <p>
            <strong>Status:</strong> {task.status}
          </p>

          <p>
            <Link href={`/edit/${task.id}`}>
              Edit
            </Link>
          </p>

          <form action={archiveTaskAction}>
            <input
              type="hidden"
              name="id"
              value={task.id}
            />

            <button type="submit">
              Archive
            </button>
          </form>
        </div>
      ))}

      <hr />

      <h2>Archived Tasks</h2>

      {archivedTasks.length === 0 && (
        <p>No archived tasks.</p>
      )}

      {archivedTasks.map((task) => (
        <div
          key={task.id}
          style={{
            border: "1px solid grey",
            padding: "10px",
            marginBottom: "15px",
            opacity: 0.7,
          }}
        >
          <h3>{task.title}</h3>

          <p>{task.description}</p>

          <p>
            <strong>Topic:</strong> {task.topic}
          </p>

          <p>
            <strong>Due:</strong> {task.due_date}
          </p>

          <p>
            <strong>Status:</strong> {task.status}
          </p>

          <p>
            <strong>Archived:</strong> {task.archived_at}
          </p>
        </div>
      ))}
    </main>
  );
}