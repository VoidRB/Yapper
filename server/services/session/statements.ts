import db from "../../db/db.ts";

import type { Session, SessionTuple } from "./model.ts";
import type { CreateSessionByUserId } from "./model.ts";

export const createSessionByUserStatement = db.prepareQuery<
  SessionTuple,
  Session,
  CreateSessionByUserId
>(
  "INSERT INTO sessions ( ip, userAgent, token, userId ) VALUES ( :ip, :userAgent, :token, :userId );",
);

export const getAllSessionsStatement = db.prepareQuery<SessionTuple, Session>(
  "SELECT * FROM sessions ;",
);
