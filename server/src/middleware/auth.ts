import { Context, Middleware, Next } from "@oak/oak";
import { verifyJwt } from "../handlers/sessions.ts";

export const authMiddleware: Middleware = async (ctx: Context, next: Next) => {
  const token = ctx.request.headers.get("Authorization")?.split(" ")[1];
  if (!token) {
    ctx.response.status = 401;
    ctx.response.body = { error: "Unauthorized" };
    console.log(token);

    return ctx.response;
  }
  console.log(token);

  const payload = await verifyJwt(token);
  ctx.state.payload = payload;
  await next();
};
