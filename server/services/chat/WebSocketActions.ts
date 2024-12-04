import { Socket } from "socket.io";
import io from "../../src/handlers/chat.ts";

const users: object[] = [];

const onConnection = (socket: Socket) => {
  console.log(`socket user ${socket.id} connected`);

  const username = socket.handshake.auth.name;
  const user = { socketId: socket.id, username: username };

  users.push(user);
  io.emit("users", users);

  io.to(socket.id).emit("userConnId", { id: socket.id });

  socket.on("disconnect", (reason) => {
    const userindex = users.findIndex((u) => u === user);
    const updatedUsers = users.splice(userindex, userindex);
    io.emit("users", updatedUsers);
    console.log(`User ${socket.id} disconnected reason : ${reason}`);
  });

  socket.on("newMessage", (msg) => {
    console.log(`new msg : ${msg}`);
    io.emit("sendallMSG", { msg: msg, id: socket.id, username: username });
  });

  socket.on("chatWith", (userSocketID) => {
    socket.join(userSocketID);
  });
};

export default onConnection;
