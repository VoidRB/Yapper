import { Server } from "socket.io";
import { socketMiddleware } from "../middleware/socketAuth.ts";

const io = new Server({
  path: "/chat/",
  cors: {
    origin: true,
    credentials: true,
  },
});

io.use(socketMiddleware);

io.on("connection", (socket) => {
  console.log(`socket user ${socket.id} connected`);

  io.to(socket.id).emit("userConnId", { id: socket.id });

  socket.on("disconnect", (reason) => {
    console.log(`User ${socket.id} disconnected reason : ${reason}`);
  });

  socket.on("join room", (roomName, _cb) => {
    //TODO toDatabase service here
    //[ ] set user id(s)
    //[ ] send msg to appropriate users
    socket.join(roomName);
    // cb(messages[roomName]);
  });

  socket.on("newMSG", (msg) => {
    console.log(`new msg : ${msg}`);
    io.emit("sendallMSG", { msg: msg, id: socket.id });
  });
});

//[ ] : clean up the socket.io and make it more suitable for 1-1 chats
//[ ] : call the message service every 50 messages from user to user

export default io;
