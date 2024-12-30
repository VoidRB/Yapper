import { Context, Router } from "@oak/oak";
import { getAllMessages } from "../handlers/messages.ts";
import { authMiddleware } from "../middleware/oakAuthMiddleware.ts";

const router = new Router();

router.use(authMiddleware);

//[ ] : clean up the socket.io and make it more suitable for 1-1 chats
//[ ] : call the message service every 50 messages from user to user

router.get("/chat/open", (_ctx: Context) => {});

router.get("/chat/close", (_ctx: Context) => {});

router.get("/chat/messages/all", (ctx: Context) => {
  getAllMessages(ctx);
});

export default router;
