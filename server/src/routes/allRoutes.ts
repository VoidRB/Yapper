import { Context, Router } from "@oak/oak";

import { getUsers, loginUser, registerUser } from "../handlers/users.ts";

const router = new Router();

router.post("/register", async (ctx: Context) => {
  await registerUser(ctx);
});
router.post("/login", async (ctx: Context) => {
  await loginUser(ctx);
});
router.get("/login/all", (ctx) => {
  getUsers(ctx);
});

export default router;
