import Database from "better-sqlite3";
import fs from "fs";
import path from "path";

console.log("Opening SQLite database...");

const dbPath = path.join(process.cwd(), "database", "database.db");

const db = new Database(dbPath);

const schema = fs.readFileSync(
  path.join(process.cwd(), "database", "schema.sql"),
  "utf8"
);

db.exec(schema);

console.log("SQLite database ready.");

export default db;