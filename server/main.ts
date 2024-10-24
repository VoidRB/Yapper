import { Application, Context, Router } from "@oak/oak";
import ChatServer from "./ChatServer.ts";

const app = new Application();
const port: any = Deno.env.get("PORT");
const router = new Router();
const server = new ChatServer();

router.get("/start_web_socket", (ctx: Context) => server.handleConnection(ctx));

app.use(router.routes());
app.use(router.allowedMethods());
app.use(async (context) => {
  await context.send({ root: Deno.cwd(), index: "Public/Index.html" });
});

console.log(`listening At http://localhost:${port}`);
await app.listen({ port });
