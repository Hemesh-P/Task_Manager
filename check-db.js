const Database = require("better-sqlite3");

const db = new Database("./database/database.db");

const rows = db.prepare("SELECT * FROM tasks").all();

console.log(rows);