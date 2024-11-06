import { Kysely } from 'kysely';
import { Database as Sqlite } from 'jsr:@db/sqlite';
import { DenoSqlite3Dialect } from 'jsr:@soapbox/kysely-deno-sqlite';

import * as user from './user.ts';
import * as session from './session.ts';
import * as message from './message.ts';

type Tables = {
  user: user.UserTable;
  session: session.SessionTable;
  message: message.MessageTable;
};

const sqlite = new Sqlite('db.sqlite3');

const db = new Kysely<Tables>({
  dialect: new DenoSqlite3Dialect({
    database: sqlite,
  }),
});

export { db };
