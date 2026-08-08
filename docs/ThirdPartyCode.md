# Third-Party Code

## better-sqlite3

`better-sqlite3` is used to communicate with the local SQLite database from Node.js. It was chosen because it provides a simple synchronous API that suits this single-user local application and allows the SQL schema and queries to remain explicit.

## Vitest

`Vitest` is used as the project's test runner. It provides a simple test setup for the TypeScript/JavaScript project and allows the database functionality to be tested using an isolated in-memory SQLite database.

## Next.js

Next.js is used as the application framework because the project is built using the Next.js App Router and server actions for handling task operations.

## React

React is used to build the application's user interface and interactive components.

## lucide-react

`lucide-react` is used for interface icons such as edit, archive and status icons rather than creating custom SVG icons manually.

## AI Usage Declaration

ChatGPT was used during development for planning, implementation assistance, debugging, and code generation. AI-generated suggestions were reviewed and adapted by the author before being incorporated into the project.