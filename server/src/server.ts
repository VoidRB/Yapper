import "@std/dotenv/load";
import { Application } from "@oak/oak";
import { oakCors } from "cors";
import userRouter from "./routes/userRoutes.ts";
import chatRouter from "./routes/chatRoutes.ts";
import io from "./handlers/chat.ts";
import { serve } from "https://deno.land/std@0.150.0/http/server.ts";
const port = Number(Deno.env.get("PORT")) || 5000;

const app = new Application();

app.use(oakCors());

app.use(userRouter.routes());
app.use(chatRouter.routes());

app.use(userRouter.allowedMethods());
app.use(chatRouter.allowedMethods());

const handler = io.handler(async (req) => {
	return (await app.handle(req)) || new Response(null, { status: 404 });
});
await serve(handler, { port: port });
