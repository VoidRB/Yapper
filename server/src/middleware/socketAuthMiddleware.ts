import { Socket } from "socket.io";
import { DefaultEventsMap } from "https://deno.land/x/socket_io@0.2.0/packages/event-emitter/mod.ts";
import { verifyJwt } from "../handlers/sessions.ts";

export const socketAuthMiddleware = async (
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, unknown>,
) => {
  socket.onAnyOutgoing(async () => {
    const token = socket.handshake.headers.get("Authorization")?.split(" ")[1];
    if (!token) throw new Error("Token not valid");
    await verifyJwt(token);
  });
};
