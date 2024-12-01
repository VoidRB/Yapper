import { Socket } from "socket.io";
import { verifyJwt } from "../handlers/sessions.ts";
import { DefaultEventsMap } from "https://deno.land/x/socket_io@0.2.0/packages/event-emitter/mod.ts";

export const socketMiddleware = async (
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, unknown>,
) => {
  socket.onAnyOutgoing(async () => {
    const token = socket.handshake.headers.get("Authorization")?.split(" ")[1];
    if (!token) throw new Error("Token not valid");
    await verifyJwt(token);
  });
};
