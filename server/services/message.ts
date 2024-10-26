import { prisma } from "../db/prisma.ts"

export class MessageService {
	constructor() { }

	async getMessagesSentByUser(userId: number) {
		return prisma.message.findMany({
			where: { fromUserId: userId }
		})
	}

	async getMessagesReceivedByUser(userId: number) {
		return prisma.message.findMany({
			where: { toUserId: userId }
		});
	}

	async getMessages() {
		return prisma.message.findMany()
	}

	async createMessage(data: { fromUserId: number, toUserId: number, content: string }) {
		return prisma.message.create({ data })
	}

	async getMessagesForUser(userId: number) {
		return prisma.message.findMany({
			where: {
				OR: [
					{ fromUserId: userId },
					{ toUserId: userId }
				]
			},
			include: {
				fromUser: true,
				toUser: true,
			},
			orderBy: {
				createdAt: 'asc',
			},
		});
	}
}
