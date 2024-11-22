import "@std/dotenv/load";
import { Application } from "@oak/oak";

import router from "./routes/allRoutes.ts";

const app = new Application();
const port = Number(Deno.env.get("PORT")) || 5000;

app.use(router.routes());
app.use(router.allowedMethods());

console.log(` : ${port}`);
await app.listen({ port: port });
