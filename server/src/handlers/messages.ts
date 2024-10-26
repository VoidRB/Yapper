import { MessageService } from "../../services/message.ts";
import { verifyJwt } from "./sessions.ts";

const messageService = new MessageService();

export async function sendMessage(req: Request): Promise<Response> {
	const token = req.headers.get("Authorization")?.split(" ")[1];
	if (!token) {
		return new Response(JSON.stringify({ error: "Unauthorized" }), {
			status: 401,
			headers: { "Content-Type": "application/json" },
		});
	}

	try {
		const payload = await verifyJwt(token);
		const { toUserId, content } = await req.json();

		const message = await messageService.createMessage({
			fromUserId: payload.userId,
			toUserId,
			content,
		});

		return new Response(JSON.stringify(message), {
			status: 201,
			headers: { "Content-Type": "application/json" },
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message }), {
			status: 400,
			headers: { "Content-Type": "application/json" },
		});
	}
}

export async function getMessages(req: Request): Promise<Response> {
	const token = req.headers.get("Authorization")?.split(" ")[1];
	if (!token) {
		return new Response(JSON.stringify({ error: "Unauthorized" }), {
			status: 401,
			headers: { "Content-Type": "application/json" },
		});
	}

	try {
		const payload = await verifyJwt(token);
		const messages = await messageService.getMessagesForUser(payload.userId);

		return new Response(JSON.stringify(messages), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message }), {
			status: 400,
			headers: { "Content-Type": "application/json" },
		});
	}
}

