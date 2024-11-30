import { Socket } from "socket.io";
import { DefaultEventsMap } from "https://deno.land/x/socket_io@0.2.0/packages/event-emitter/mod.ts";
import { verifyJwt } from "../handlers/sessions.ts";

export const socketMiddleware = async (
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, unknown>,
) => {
  const token = socket.handshake.headers.get("Authorization")?.split(" ")[1];
  if (!token) throw new Error("Token not valid");
  const payload = await verifyJwt(token);
  socket.data = payload;
  next();
};

function next() {}
