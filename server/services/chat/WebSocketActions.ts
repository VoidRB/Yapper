// deno-lint-ignore-file no-explicit-any
import { Socket } from "socket.io";
import io from "../../src/handlers/chat.ts";
import { MessageService } from "../message/service.ts";

const users: object[] = [];
const messageService = new MessageService();

const onConnection = (socket: Socket) => {
  console.log(`socket user ${socket.id} connected`);

  const user = {
    socketId: socket.id,
    username: socket.handshake.auth.name,
    userId: Number(socket.handshake.auth.userId),
  };

  const recievedMessages = messageService.getMessagesRecievedByUser({
    userId: user.userId,
  });
  const sentMessages = messageService.getMessagesSentByUser({
    userId: user.userId,
  });
  io.to(socket.id).emit("message:all", { recievedMessages, sentMessages });

  users.push(user);

  const disconnect = (reason: any) => {
    const userindex = users.findIndex((u) => u === user);
    const updatedUsers = users.splice(userindex, userindex);
    io.emit("users:all", updatedUsers);
    console.log(`User ${socket.id} disconnected reason : ${reason}`);
  };
  const globalMessage = (content: any) => {
    const message = {
      content: content,
      id: socket.id,
    };
    io.emit("message:global", {
      message,
      username: user.username,
    });
  };
  const privateMessage = ({ content, toSocketId, toUserId }: any) => {
    const message = {
      content: String(content),
      fromUserId: user.userId,
      toUserId: Number(toUserId),
    };
    socket
      .to(toSocketId)
      .emit("message:private", { message, username: user.username });
    messageService.createMessage(message);
  };
  const clearMessages = () => {
    socket.emit("message:clear");
  };
  const setMessages = () => {
    socket.emit("message:set");
  };
  io.to(socket.id).emit("user:id", { id: socket.id });
  io.emit("users:all", users);
  socket.on("disconnect", disconnect);
  socket.on("message:global", globalMessage);
  socket.on("message:private", privateMessage);
  socket.on("message:clear", clearMessages);
  socket.on("message:set", setMessages);
};

export default onConnection;
