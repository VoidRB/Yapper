import { prisma } from "../db/prisma.ts"

export class UserService {
	constructor() { }

	async getUser(id: number) {
		return prisma.user.findUniqueOrThrow({
			where: { id }
		})
	}

	async getUserByEmail(email: string) {
		return prisma.user.findUniqueOrThrow({
			where: { email }
		})
	}

	async getUsers() {
		return prisma.user.findMany()
	}

	async createUser(data: { email: string, passwordHash: string }) {
		return prisma.user.create({ data })
	}
}
