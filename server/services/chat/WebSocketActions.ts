import { Socket } from "socket.io";
import io from "../../src/handlers/chat.ts";

const users: object[] = [];

const onConnection = (socket: Socket) => {
  console.log(`socket user ${socket.id} connected`);

  const user = {
    socketId: socket.id,
    username: socket.handshake.auth.name,
    userId: socket.handshake.auth.userId,
  };

  io.to(socket.id).emit("user:id", { id: socket.id });
  users.push(user);

  socket.on("disconnect", (reason) => {
    const userindex = users.findIndex((u) => u === user);
    const updatedUsers = users.splice(userindex, userindex);
    io.emit("users:all", updatedUsers);
    console.log(`User ${socket.id} disconnected reason : ${reason}`);
  });
  io.emit("users:all", users);

  socket.on("message:global", (content) => {
    io.emit("message:global", {
      content: content,
      id: socket.id,
      username: user.username,
    });
  });

  socket.on("message:private", ({ content, toSocketId, _toUserId }) => {
    socket.to(toSocketId).emit("message:private", {
      content,
      from: socket.id,
      username: user.username,
    });
  });

  socket.on("message:clear", () => {
    socket.emit("message:clear");
  });
};

export default onConnection;
