import { Context, Router } from "@oak/oak";
import { getAllMessages } from "../handlers/messages.ts";
// import { authMiddleware } from "../middleware/auth.ts";

const router = new Router();

// router.use(authMiddleware);

router.get("/chat/open", (ctx: Context) => {
  const socket = ctx.upgrade();
  socket.onopen = () => {
    console.log(`USER JOINED`);
  };
  socket.onclose = () => {
    console.log(`USER LEFT`);
  };
  socket.onmessage = (e) => {
    socket.send(`Sent : ${e.data}`);
  };
});

router.get("/chat/close", (_ctx: Context) => {});

router.get("/chat/messages/all", (ctx: Context) => {
  getAllMessages(ctx);
});

export default router;
