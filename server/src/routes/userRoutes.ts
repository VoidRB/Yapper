import { Context, Router } from "@oak/oak";
import {
  getUsers,
  loginUser,
  logoutUser,
  registerUser,
} from "../handlers/users.ts";

const router = new Router();

router.post("/logout", async (ctx: Context) => {
  await logoutUser(ctx);
});

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

export default router;
