import { registerUser, loginUser, getUsers } from "./handlers/users.ts";
import { sendMessage, getMessages } from "./handlers/messages.ts";
import { db } from "../db/index.ts";

// TODO: refactor seeds to become a migration
try {
	const userExists = await db.selectFrom('user').selectAll().where('email', '=', 'test@test.com').executeTakeFirst();

	if (!userExists) {
		await db.insertInto('user').values({
			email: 'test@test.com',
			passwordHash: 'test',
		}).execute()
	}
} catch (e) {
	console.error("Failed to seed database", e)
}

// TODO: refactor to use a router
Deno.serve(async (req: Request) => {
	const url = new URL(req.url);
	const action = url.pathname.split("/")[1];

	switch (action) {
		case "register":
			return registerUser(req);
		case "login":
			return loginUser(req);

		// TODO: refactor to use auth middleware for all routes except for register and login
		case "send-message":
			return sendMessage(req);
		case "get-messages":
			return getMessages(req);
		case "get-users":
			return getUsers(req);
		default:
			return new Response("Not Found", { status: 404 });
	}
});
