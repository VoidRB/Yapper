import {
	type CreateSessionByUserSpec,
	createSessionByUserSpec,
	type Session,
} from "./model.ts";

import { createSessionByUserStatement } from "./statements.ts";

export class SessionService {
	constructor() {}

	async createUserSession(data: CreateSessionByUserSpec): Promise<Session[]> {
		const { ip, userAgent, token, userId } =
			createSessionByUserSpec.parse(data);
		const session = createSessionByUserStatement.allEntries({
			ip,
			userAgent,
			token,
			userId,
		});
		return await session;
	}
}
