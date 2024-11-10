// deno-lint-ignore-file no-explicit-any

import { MessageService } from "../../services/message.ts";
import { verifyJwt } from "./sessions.ts";
import { Request, Response } from "express";

const messageService = new MessageService();

export async function sendMessage(
	req: Request,
	res: Response
): Promise<Response> {
	const token = req.header("Authorization")?.split(" ")[1];
	if (!token) {
		return res
			.status(401)
			.set("Content-Type", "application/json")
			.send(JSON.stringify({ error: "Unauthorized" }));
	}

	try {
		const payload = await verifyJwt(token);
		const { toUserId, content } = await req.json();

		const message = await messageService.createMessage({
			fromUserId: payload.userId,
			toUserId,
			content,
		});

		return res
			.status(201)
			.set("Content-Type", "application/json")
			.send(JSON.stringify(message));
	} catch (error: any) {
		return res
			.status(400)
			.set("Content-Type", "application/json")
			.send(JSON.stringify({ error: error.message }));
	}
}

export async function getMessages(
	req: Request,
	res: Response
): Promise<Response> {
	const token = req.header("Authorization")?.split(" ")[1];
	if (!token) {
		return res
			.status(401)
			.set("Content-Type", "application/json")
			.send(JSON.stringify({ error: "Unauthorized" }));
	}

	try {
		const payload = await verifyJwt(token);
		const messages = messageService.getMessagesReceivedByUser(payload.userId);

		return res
			.status(200)
			.set("Content-Type", "application/json")
			.send(JSON.stringify(messages));
	} catch (error: any) {
		return res
			.status(400)
			.set("Content-Type", "application/json")
			.send(JSON.stringify({ error: error.message }));
	}
}
