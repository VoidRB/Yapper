import "@std/dotenv/load";
import { Application, Context } from "@oak/oak";
import { authMiddleware } from "./middleware/auth.ts";
import { getAllMessages } from "./handlers/messages.ts";
import router from "./routes/allRoutes.ts";

const app = new Application();
const port = Number(Deno.env.get("PORT"));

app.use(router.routes());
app.use(router.allowedMethods());

app.use(authMiddleware);

router.get("/chat/messages/all", (ctx: Context) => {
  getAllMessages(ctx);
});

console.log(` : ${port}`);
await app.listen({ port: port });
