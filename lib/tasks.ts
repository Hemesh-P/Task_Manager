import db from "@/database/db";

export interface Task {
  id: number;
  title: string;
  description: string | null;
  due_date: string;
  topic: string;
  status: "todo" | "in_progress" | "complete";
  archived_at: string | null;
  created_at: string;
}

interface CreateTaskData {
  title: string;
  description: string;
  due_date: string;
  topic: string;
}

export function createTask(task: CreateTaskData) {
  const stmt = db.prepare(`
    INSERT INTO tasks
    (title, description, due_date, topic)
    VALUES (?, ?, ?, ?)
  `);

  stmt.run(
    task.title,
    task.description,
    task.due_date,
    task.topic
  );
}

export function getTasks(sortBy: string = "due_date"): Task[] {
    let orderBy = "due_date ASC";

    switch (sortBy) {
    case "topic":
        orderBy = "topic ASC";
        break;

    case "status":
        orderBy = `
        CASE status
            WHEN 'todo' THEN 1
            WHEN 'in_progress' THEN 2
            WHEN 'complete' THEN 3
        END
        `;
        break;

    case "due_date":
    default:
        orderBy = "due_date ASC";
    }

    return db.prepare(`
    SELECT *
    FROM tasks
    WHERE archived_at IS NULL
    ORDER BY ${orderBy}
    `).all() as Task[];
}

export function getTaskById(id: number): Task | undefined {
  const stmt = db.prepare(`
    SELECT *
    FROM tasks
    WHERE id = ?
  `);

  return stmt.get(id) as Task | undefined;
}

export function archiveTask(id: number) {
  const stmt = db.prepare(`
    UPDATE tasks
    SET archived_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `);

  stmt.run(id);
}

export function getArchivedTasks(): Task[] {
  return db.prepare(`
    SELECT *
    FROM tasks
    WHERE archived_at IS NOT NULL
    ORDER BY archived_at DESC
  `).all() as Task[];
}

export function updateTask(
  id: number,
  task: {
    title: string;
    description: string;
    due_date: string;
    topic: string;
  }
) {
  const stmt = db.prepare(`
    UPDATE tasks
    SET
      title = ?,
      description = ?,
      due_date = ?,
      topic = ?
    WHERE id = ?
  `);

  stmt.run(
    task.title,
    task.description,
    task.due_date,
    task.topic,
    id
  );
}