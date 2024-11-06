import db from '../db/db.ts';
import { sessionObj, sessionTuple } from '../src/types/allTypes.ts';

export class SessionService {
  constructor() {}

  async getSession(id: number) {
    const query = db.prepareQuery<
      sessionTuple,
      sessionObj,
      {
        id: number;
      }
    >('SELECT * FROM sessions WHERE id = :id ;');
    const session = query.firstEntry({ id: id });
    query.finalize();
    return await session;
  }

  async getSessions() {
    const query = db.prepareQuery<sessionTuple, sessionObj>(
      'SELECT * FROM sessions ;'
    );
    const sessions = query.firstEntry();
    query.finalize();
    return await sessions;
  }

  createSession(data: {
    ip: string;
    userAgent: string;
    token: string;
    userId: number;
  }) {
    const query = db.prepareQuery<sessionTuple, sessionObj, typeof data>(
      'INSERT INTO sessions ( ip, userAgent, token, userId ) VALUES ( :ip, :userAgent, :token, :userId )'
    );
    const session = query.firstEntry({
      ip: data.ip,
      userAgent: data.userAgent,
      token: data.token,
      userId: data.userId,
    });
    query.finalize();
    return session;
  }
}
