import type { Socket } from "socket.io";
import { DefaultEventsMap } from "https://deno.land/x/socket_io@0.2.0/packages/event-emitter/mod.ts";

export const socketUserMiddleware = async (
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, unknown>,
) => {
  const username = socket.handshake.auth.name;
  const userId = socket.handshake.auth.userId;
  console.log(username, userId);
};
