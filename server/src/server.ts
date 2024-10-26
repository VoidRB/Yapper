import { registerUser, loginUser } from "./handlers/users.ts";
import { sendMessage, getMessages } from "./handlers/messages.ts";

Deno.serve(async (req: Request) => {
	const url = new URL(req.url);
	const action = url.pathname.split("/")[1];

	switch (action) {
		case "register":
			return registerUser(req);
		case "login":
			return loginUser(req);
		case "send-message":
			return sendMessage(req);
		case "get-messages":
			return getMessages(req);
		default:
			return new Response("Not Found", { status: 404 });
	}
});
