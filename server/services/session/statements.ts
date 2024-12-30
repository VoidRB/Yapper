import db from "../../db/db.ts";

import type {
  GetSessionByUserId,
  RemoveSessionByUserId,
  Session,
  SessionTuple,
} from "./model.ts";
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
>("DELETE FROM sessions WHERE userId = :userId ;");

export const getSessionByUserIdStatement = db.prepareQuery<
  SessionTuple,
  Session,
  GetSessionByUserId
>(
  "SELECT id, ip, userAgent, token, userId FROM sessions WHERE userId = :userId ;",
);

export const getAllSessionsStatement = db.prepareQuery<SessionTuple, Session>(
  "SELECT id, ip, userAgent, token, userId FROM sessions ;",
);
