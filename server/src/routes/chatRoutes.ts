import { Context, Router } from "@oak/oak";
import { getAllMessages } from "../handlers/messages.ts";
import { authMiddleware } from "../middleware/auth.ts";

const router = new Router();

router.use(authMiddleware);

router.get("/chat/open", (_ctx: Context) => {});

router.get("/chat/close", (_ctx: Context) => {});

router.get("/chat/messages/all", (ctx: Context) => {
  getAllMessages(ctx);
});

export default router;
