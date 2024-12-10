import {
  type CreateSessionByUserId,
  createSessionByUserIdSpec,
  GetSessionByUserId,
  getSessionByUserIdSpec,
  RemoveSessionByUserId,
  removeSessionByUserIdSpec,
} from "./model.ts";

import {
  createSessionByUserStatement,
  getAllSessionsStatement,
  getSessionByUserIdStatement,
  removeSessionByUserIdStatement,
} from "./statements.ts";

export class SessionService {
  constructor() {}

  createUserSession(data: CreateSessionByUserId) {
    const { ip, userAgent, token, userId } = createSessionByUserIdSpec.parse(
      data,
    );
    const session = createSessionByUserStatement.allEntries({
      ip,
      userAgent,
      token,
      userId,
    });
    return session;
  }

  removeSession(data: RemoveSessionByUserId) {
    const { userId } = removeSessionByUserIdSpec.parse(data);
    const removedSession = removeSessionByUserIdStatement.allEntries({
      userId,
    });
    return removedSession;
  }

  getSingleSession(data: GetSessionByUserId) {
    const { userId } = getSessionByUserIdSpec.parse(data);
    const session = getSessionByUserIdStatement.allEntries({
      userId,
    });

    return session;
  }

  getSessions() {
    const sessions = getAllSessionsStatement.allEntries();

    return sessions;
  }
}
