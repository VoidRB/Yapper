import { Socket } from "socket.io";
import io from "../../src/handlers/chat.ts";
import { MessageService } from "../message/service.ts";
import { Room } from "https://deno.land/x/socket_io@0.2.0/packages/socket.io/lib/adapter.ts";
import type { DisconnectReason } from "./types.ts";

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

  const disconnect = (reason: DisconnectReason) => {
    const userindex = users.findIndex((u) => u === user);
    const updatedUsers = users.splice(userindex, userindex);
    io.emit("users:all", updatedUsers);
    console.log(`User ${socket.id} disconnected reason : ${reason}`);
  };

  const globalMessage = (content: { content: string; toUserId: number }) => {
    io.emit("message:global", {
      content: content.content,
      id: socket.id,
      fromUserId: user.userId,
      toUserId: content.toUserId,
    });
  };
  const privateMessage = (sentMessage: {
    content: string;
    toUserId: number;
    toSocketId: Room | Room[];
  }) => {
    const message = {
      content: sentMessage.content,
      fromUserId: user.userId,
      toUserId: sentMessage.toUserId,
    };
    console.log(message);
    messageService.createMessage(message);
    socket.to(sentMessage.toSocketId).emit("message:private", message);
  };

  const clearMessages = () => {
    socket.emit("message:clear");
  };

  const setMessages = (fullConvo: object) => {
    socket.emit("message:set", fullConvo);
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
