//TODO toDatabase service here?
//[ ] set user id(s)?
//[ ] send msg to appropriate users
//[ ] : clean up the socket.io and make it more suitable for 1-1 chats
//[ ] : call the message service every 50 messages from user to user

import { Server, Socket } from "socket.io";

import { socketMiddleware } from "../middleware/socketAuth.ts";

const io = new Server({
  path: "/chat/",
  cors: {
    origin: true,
    credentials: true,
  },
});

io.use(socketMiddleware);
const users: object[] = [];

io.on("connection", (socket: Socket) => {
  console.log(`socket user ${socket.id} connected`);

  const username = socket.handshake.auth.name;
  const user = { socketId: socket.id, username: username };

  users.push(user);
  io.emit("users", users);

  io.to(socket.id).emit("userConnId", { id: socket.id });

  socket.on("disconnect", (reason) => {
    const userindex = users.findIndex((u) => u === user);
    users.splice(userindex, userindex);
    io.emit("users", users);
    console.log(`User ${socket.id} disconnected reason : ${reason}`);
  });

  socket.on("newMessage", (msg) => {
    console.log(`new msg : ${msg}`);
    io.emit("sendallMSG", { msg: msg, id: socket.id });
  });

  socket.on("chatWith", (userSocketID) => {
    socket.join(userSocketID);
  });
});

export default io;
