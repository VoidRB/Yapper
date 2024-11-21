import "@std/dotenv/load";
import { Application, Context, Router } from "@oak/oak";
import { authMiddleware } from "./middleware/auth.ts";
import { loginUser, registerUser } from "./handlers/users.ts";
import { getAllMessages } from "./handlers/messages.ts";

const app = new Application();
const router = new Router();
const port = Number(Deno.env.get("PORT"));

app.use(router.routes());
app.use(router.allowedMethods());

router.post("/register", async (ctx: Context) => {
  await registerUser(ctx);
});

router.post("/login", async (ctx: Context) => {
  await loginUser(ctx);
});

app.use(authMiddleware);

router.get("/chat/messages/all", (ctx: Context) => {
  getAllMessages(ctx);
});

console.log(` : ${port}`);
await app.listen({ port: port });
