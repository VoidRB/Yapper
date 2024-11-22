import { Context, Router } from "@oak/oak";

import { getUsers, loginUser, registerUser } from "../handlers/users.ts";
import { getAllMessages } from "../handlers/messages.ts";
import { authMiddleware } from "../middleware/auth.ts";

const router = new Router();

router.post("/register", async (ctx: Context) => {
  await registerUser(ctx);
});
router.post("/login", async (ctx: Context) => {
  await loginUser(ctx);
});
//for testing
router.get("/login/all", (ctx) => {
  getUsers(ctx);
});

router.use(authMiddleware);

router.get("/chat/open", (_ctx: Context) => {});

router.get("/chat/close", (_ctx: Context) => {});

router.get("/chat/messages/all", (ctx: Context) => {
  getAllMessages(ctx);
});

export default router;
