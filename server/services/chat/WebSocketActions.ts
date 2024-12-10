import { Socket } from "socket.io";
import io from "../../src/handlers/chat.ts";

const users: object[] = [];

const onConnection = (socket: Socket) => {
  console.log(`socket user ${socket.id} connected`);

  const username = socket.handshake.auth.name;
  const userId = socket.handshake.auth.userId;

  const user = { socketId: socket.id, username: username, userId: userId };

  io.to(socket.id).emit("userConnId", { id: socket.id });
  users.push(user);

  socket.on("disconnect", (reason) => {
    const userindex = users.findIndex((u) => u === user);
    const updatedUsers = users.splice(userindex, userindex);
    io.emit("users", updatedUsers);
    console.log(`User ${socket.id} disconnected reason : ${reason}`);
  });
  io.emit("users", users);

  socket.on("newMessage", (content) => {
    io.emit("sendallMSG", {
      content: content,
      id: socket.id,
      username: username,
    });
  });

  socket.on("private message", ({ content, to }) => {
    socket
      .to(to)
      .emit("private message", { content, from: socket.id, username });
  });

  socket.on("clearTexts", () => {
    socket.emit("clearTexts");
  });
};

export default onConnection;
