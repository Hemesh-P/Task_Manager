import Database from "better-sqlite3";
import { describe, it, expect, beforeEach } from "vitest";
import { schema } from "../database/schema";
let db: Database.Database;

beforeEach(() => {
    db = new Database(":memory:");
    db.exec(schema);
});

describe("Tasks", () => {
it("creates a task", () => {
    db.prepare(`
        INSERT INTO tasks
        (title, description, due_date, topic)
        VALUES
        ('Homework','Math','2026-08-10','Math')
    `).run();

    const task = db
        .prepare("SELECT * FROM tasks")
        .get() as any;

    expect(task.title).toBe("Homework");
    expect(task.topic).toBe("Math");
});

it("archives a task", () => {

    const result = db.prepare(`
        INSERT INTO tasks
        (title,description,due_date,topic)
        VALUES
        ('Task','','2026-08-10','Math')
    `).run();

    db.prepare(`
        UPDATE tasks
        SET archived_at=CURRENT_TIMESTAMP
        WHERE id=?
    `).run(result.lastInsertRowid);

    const active = db.prepare(`
        SELECT *
        FROM tasks
        WHERE archived_at IS NULL
    `).all();

    const archived = db.prepare(`
        SELECT *
        FROM tasks
        WHERE archived_at IS NOT NULL
    `).all();

    expect(active.length).toBe(0);
    expect(archived.length).toBe(1);
});

it("marks only incomplete past-due tasks as overdue", () => {

    db.prepare(`
        INSERT INTO tasks
        (title,due_date,topic,status)
        VALUES
        ('A','2020-01-01','Math','todo')
    `).run();

    db.prepare(`
        INSERT INTO tasks
        (title,due_date,topic,status)
        VALUES
        ('B','2020-01-01','Math','complete')
    `).run();

    const tasks = db.prepare(`
        SELECT *,
        (
            due_date < DATE('now')
            AND status != 'complete'
        ) AS overdue
        FROM tasks
    `).all() as any[];

    expect(tasks[0].overdue).toBe(1);
    expect(tasks[1].overdue).toBe(0);
});
});