import db from "../../db/db.ts";

import type { RemoveSessionByUserId, Session, SessionTuple } from "./model.ts";
import type { CreateSessionByUserId } from "./model.ts";

export const createSessionByUserStatement = db.prepareQuery<
  SessionTuple,
  Session,
  CreateSessionByUserId
>(
  "INSERT INTO sessions ( ip, userAgent, token, userId ) VALUES ( :ip, :userAgent, :token, :userId );",
);
export const removeSessionByUserIdStatement = db.prepareQuery<
  SessionTuple,
  Session,
  RemoveSessionByUserId
>("DELETE from sessions where userId = :userId ;");

export const getAllSessionsStatement = db.prepareQuery<SessionTuple, Session>(
  "SELECT * FROM sessions ;",
);
