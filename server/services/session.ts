import { db } from "../db/index.ts"

export class SessionService {
	constructor() { }

	async getSession(id: number) {
		return db.selectFrom('session')
			.where('id', '=', id)
			.selectAll()
			.executeTakeFirstOrThrow()
	}

	async getSessions() {
		return db.selectFrom('session')
			.selectAll()
			.execute()
	}

	async createSession(data: { ip: string, userAgent: string, token: string, userId: number }) {
		return db.insertInto('session').values(data).execute()
	}
}