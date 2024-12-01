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
//TODO new column for either users or rooms/groups
db.execute(`
  CREATE TABLE IF NOT EXISTS message (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fromUserId INTEGER,
    toUserId INTEGER,
    content STRING 
  )
`);
console.log(`Registered Users`);
db.queryEntries("SELECT * FROM users;").forEach((user) => {
  console.log(`id : ${user.id}  | Name : ${user.username}`);
});
console.log(`Registered Sessions`);

db.queryEntries("SELECT * FROM sessions;").forEach((session) => {
  console.log(`id : ${session.id} | userId :  ${session.userId}`);
});
db.queryEntries("SELECT * FROM message;").forEach((message) => {
  console.log(`id : ${message.id}`);
});
// db.close();

export default db;
