import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: true,
    credentials: true,
  },
});

//[ ] : clean up the socket.io and make it more suitable for 1-1 chats
//[ ] : call the message service every 50 messages from user to user

io.on("connection", (socket) => {
  console.log(`socket user ${socket.id} connected`);

  socket.on("disconnect", (reason) => {
    console.log(`User ${socket.id} disconnected reason : ${reason}`);
  });

  socket.on("newMSG", (p) => {
    console.log(`new msg  : ${p}`);
    io.emit("sendallMSG", { data: p });
  });
});

export default io;
