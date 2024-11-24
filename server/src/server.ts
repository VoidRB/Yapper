import "@std/dotenv/load";
import { Application } from "@oak/oak";
import { oakCors } from "cors";
import userRouter from "./routes/userRoutes.ts";
import chatRouter from "./routes/chatRoutes.ts";

const port = Number(Deno.env.get("PORT")) || 5000;

const app = new Application();
app.use(oakCors());
app.use(userRouter.routes());
app.use(chatRouter.routes());

app.use(userRouter.allowedMethods());
app.use(chatRouter.allowedMethods());

console.log(` : ${port}`);
await app.listen({ port: port });
