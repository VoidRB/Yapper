//TODO toDatabase service here?
//[ ] set user id(s)?
//[ ] send msg to appropriate users
//[ ] : clean up the socket.io and make it more suitable for 1-1 chats
//[ ] : call the message service every 50 messages from user to user

import { Server } from "socket.io";

import { socketMiddleware } from "../middleware/socketAuth.ts";
import onConnection from "../../services/chat/WebSocketActions.ts";

const io = new Server({
  path: "/chat/",
  cors: {
    origin: true,
    credentials: true,
  },
});

io.use(socketMiddleware);

io.on("connection", onConnection);

export default io;
