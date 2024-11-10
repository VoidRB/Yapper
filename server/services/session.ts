import db from "../db/db.ts";
import { sessionObj, sessionTuple } from "../src/types/allTypes.ts";

export class SessionService {
	constructor() {}

	getSessions() {
		const query = db.prepareQuery<sessionTuple, sessionObj>(
			"SELECT * FROM sessions ;"
		);
		const sessions = query.firstEntry();
		query.finalize();
		return sessions;
	}

	createSession(data: {
		ip: string;
		userAgent: string;
		token: string;
		userId: number;
	}) {
		const query = db.prepareQuery<sessionTuple, sessionObj, typeof data>(
			"INSERT INTO sessions ( ip, userAgent, token, userId ) VALUES ( :ip, :userAgent, :token, :userId )"
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
