# Database Design

## Database

The application uses a local SQLite database stored as:

database/database.db

The project contains a single table called **tasks**.

---

## Tasks Table

| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER PRIMARY KEY AUTOINCREMENT | Unique task ID |
| title | TEXT NOT NULL | Task title |
| description | TEXT | Optional description |
| due_date | TEXT NOT NULL | Due date stored as ISO date |
| topic | TEXT NOT NULL | Subject/category |
| status | TEXT NOT NULL | Todo, In Progress or Complete |
| archived_at | TEXT | Null while active, timestamp when archived |
| created_at | TEXT | Creation timestamp |

---

## Status Constraint

The status column is limited using a CHECK constraint.

Allowed values are:

- todo
- in_progress
- complete

This prevents invalid statuses from being stored.

---

## Archiving

Tasks are never deleted.

Instead, the archived_at field is populated with the current timestamp.

Active tasks have:

archived_at = NULL

Archived tasks remain in the database and can still be viewed.

---

## Overdue Tasks

Overdue is **not stored** in the database.

Instead it is calculated whenever tasks are displayed.

A task is overdue when:

- the due date has passed
- the task is not marked Complete

This avoids storing data that would become outdated over time.

---

## AI Declaration

This document was drafted with assistance from ChatGPT (GPT-5.5). The author reviewed and edited the final content.