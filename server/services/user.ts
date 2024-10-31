import { db } from "../db/index.ts"

export class UserService {
	constructor() { }

	async getUser(id: number) {
		return db.selectFrom('user')
			.where('id', '=', id)
			.selectAll()
			.executeTakeFirstOrThrow()
	}

	async getUserByEmail(email: string) {
		return db.selectFrom('user')
			.where('email', '=', email)
			.selectAll()
			.executeTakeFirstOrThrow()
	}

	async getUsers() {
		return db.selectFrom('user')
			.selectAll()
			.execute()
	}

	async createUser(data: { email: string, passwordHash: string }) {
		return db.insertInto('user').values(data).executeTakeFirstOrThrow()
	}
}
