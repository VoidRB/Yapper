import { Context, Router } from "@oak/oak";

import { registerUser } from "../handlers/users.ts";

const router = new Router();

router.post("/", async (ctx: Context) => {
  await registerUser(ctx);
});

export default router;
