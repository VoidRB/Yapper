import { prisma } from "../db/prisma.ts"

export class SessionService {
	constructor() { }

	async getSession(id: number) {
		return prisma.session.findUniqueOrThrow({
			where: { id }
		})
	}

	async getSessions() {
		return prisma.session.findMany()
	}

	async createSession(data: { ip: string, userAgent: string, token: string, userId: number }) {
		return prisma.session.create({ data })
	}
}