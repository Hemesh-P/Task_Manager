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

export function getTasks(): Task[] {
  return db
    .prepare(
      `
      SELECT *
      FROM tasks
      WHERE archived_at IS NULL
      ORDER BY due_date ASC
      `
    )
    .all() as Task[];
}