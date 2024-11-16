import {
  type CreateSessionByUserId,
  createSessionByUserIdSpec,
} from "./model.ts";

import {
  createSessionByUserStatement,
  getAllSessionsNoStatement,
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

  getSessions() {
    const sessions = getAllSessionsNoStatement.allEntries();

    return sessions;
  }
}
