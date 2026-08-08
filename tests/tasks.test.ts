import Database from "better-sqlite3";
import { describe, it, expect, beforeEach } from "vitest";
import fs from "fs";
import path from "path";

let db: Database.Database;

beforeEach(() => {
  db = new Database(":memory:");

  const schema = fs.readFileSync(
    path.join(process.cwd(), "database", "schema.sql"),
    "utf8"
  );

  db.exec(schema);
});

describe("Tasks", () => {
  it("creates a task and reads it back", () => {
    const result = db
      .prepare(`
        INSERT INTO tasks
        (title, description, due_date, topic)
        VALUES (?, ?, ?, ?)
      `)
      .run(
        "Homework",
        "Math assignment",
        "2026-08-10",
        "Math"
      );

    const task = db
      .prepare("SELECT * FROM tasks WHERE id = ?")
      .get(result.lastInsertRowid) as any;

    expect(task.title).toBe("Homework");
    expect(task.description).toBe("Math assignment");
    expect(task.due_date).toBe("2026-08-10");
    expect(task.topic).toBe("Math");
    expect(task.status).toBe("todo");
    expect(task.archived_at).toBeNull();
  });

  it("archives a task without deleting it", () => {
    const result = db
      .prepare(`
        INSERT INTO tasks
        (title, description, due_date, topic)
        VALUES (?, ?, ?, ?)
      `)
      .run(
        "Archive test",
        "",
        "2026-08-10",
        "Math"
      );

    const id = result.lastInsertRowid;

    db.prepare(`
      UPDATE tasks
      SET archived_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(id);

    const active = db
      .prepare(`
        SELECT *
        FROM tasks
        WHERE archived_at IS NULL
      `)
      .all();

    const archived = db
      .prepare(`
        SELECT *
        FROM tasks
        WHERE archived_at IS NOT NULL
      `)
      .all();

    expect(active.length).toBe(0);
    expect(archived.length).toBe(1);
  });

  it("marks incomplete past-due tasks as overdue", () => {
    db.prepare(`
      INSERT INTO tasks
      (title, due_date, topic, status)
      VALUES (?, ?, ?, ?)
    `).run(
      "Overdue task",
      "2020-01-01",
      "Math",
      "todo"
    );

    const task = db
      .prepare(`
        SELECT *,
          (
            due_date < DATE('now')
            AND status != 'complete'
          ) AS overdue
        FROM tasks
      `)
      .get() as any;

    expect(task.overdue).toBe(1);
  });

  it("does not mark completed past-due tasks as overdue", () => {
    db.prepare(`
      INSERT INTO tasks
      (title, due_date, topic, status)
      VALUES (?, ?, ?, ?)
    `).run(
      "Completed task",
      "2020-01-01",
      "Math",
      "complete"
    );

    const task = db
      .prepare(`
        SELECT *,
          (
            due_date < DATE('now')
            AND status != 'complete'
          ) AS overdue
        FROM tasks
      `)
      .get() as any;

    expect(task.overdue).toBe(0);
  });
});