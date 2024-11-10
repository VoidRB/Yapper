import db from "../../db/db.ts";

import type { Session, SessionTuple } from "./model.ts";
import type { CreateSessionByUserSpec } from "./model.ts";

export const createSessionByUserStatement = db.prepareQuery<
	SessionTuple,
	Session,
	CreateSessionByUserSpec
>(
	"INSERT INTO sessions ( ip, userAgent, token, userId ) VALUES ( :ip, :userAgent, :token, :userId );"
);
