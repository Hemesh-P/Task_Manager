# Database Design

## SQLite Database

The application uses a local SQLite database stored in `database/database.db`.

The database contains one main table:

## tasks

| Column | Type | Description |
|---|---|---|
| id | INTEGER PRIMARY KEY AUTOINCREMENT | Unique task identifier |
| title | TEXT NOT NULL | Task title |
| description | TEXT | Optional task description |
| due_date | TEXT NOT NULL | Task due date stored as an ISO date |
| topic | TEXT NOT NULL | Task topic |
| status | TEXT NOT NULL | Task status |
| archived_at | TEXT | NULL for active tasks, timestamp when archived |
| created_at | TEXT NOT NULL | Time the task was created |

## Status

Tasks have exactly three possible statuses:

- `todo`
- `in_progress`
- `complete`

The status is constrained in the SQLite schema so that other values cannot be inserted.

New tasks automatically receive the `todo` status.

Users can change the status when editing a task.

## Archiving

Tasks are never deleted when archived.

Instead, `archived_at` is set to the current timestamp. An `archived_at` value of `NULL` means that the task is active.

This means archived tasks remain stored in the database and can still be displayed in the Archived section.

## Overdue Tasks

Overdue is not stored as a database column.

A task is considered overdue when:

1. Its due date has passed, and
2. Its status is not `complete`.

The overdue value is therefore derived when tasks are read rather than stored permanently.

This prevents the overdue value from becoming stale as time passes.

## Sorting

Active tasks can be sorted by:

- Due date
- Topic
- Status

When sorting by status, the application deliberately uses:

1. To do
2. In progress
3. Complete

rather than alphabetical order.

## AI Usage Declaration

ChatGPT was used to assist with planning and reviewing the database design and implementation. The final schema and implementation were reviewed and adapted by the author.