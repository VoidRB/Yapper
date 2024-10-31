import { db } from "../db/index.ts"

export class MessageService {
	constructor() { }

	async getMessagesSentByUser(userId: number) {
		return db.selectFrom('message')
			.where('fromUserId', '=', userId)
			.selectAll()
			.execute()
	}

	async getMessagesReceivedByUser(userId: number) {
		return db.selectFrom('message')
			.where('toUserId', '=', userId)
			.selectAll()
			.execute()
	}

	async getMessages() {
		return db.selectFrom('message')
			.selectAll()
			.execute()
	}

	async createMessage(data: { fromUserId: number, toUserId: number, content: string }) {
		return db.insertInto('message').values(data).execute()
	}
}