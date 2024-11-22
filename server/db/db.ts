import { DB } from "sqlite";

// Open a database
const db = new DB("./db/test.db");

//USERS TABLE
db.execute(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    hashedPassword TEXT
  )
`);
//SESSIONS TABLE
db.execute(`
  CREATE TABLE IF NOT EXISTS sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ip TEXT,
    userAgent STRING,
    token TEXT,
    userId INTEGER 
  )
`);
//MESSAGE TABLE
db.execute(`
  CREATE TABLE IF NOT EXISTS message (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fromUserId INTEGER,
    toUserId INTEGER,
    content STRING 
  )
`);

console.log(db.query("SELECT * FROM users;"));
console.log(db.query("SELECT * FROM sessions;"));
console.log(db.query("SELECT * FROM message;"));
// db.close();

export default db;
