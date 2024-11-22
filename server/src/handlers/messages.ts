// deno-lint-ignore-file no-explicit-any

import { Context } from "@oak/oak";
import { MessageService } from "../../services/message/service.ts";
import { verifyJwt } from "./sessions.ts";

const messageService = new MessageService();

export async function sendMessage(ctx: Context) {
  const token = ctx.request.headers.get("Authorization")?.split(" ")[1];
  if (!token) {
    ctx.response.status = 401;
    ctx.response.body = { error: "Unauthorized" };
    return ctx.response;
  }

  try {
    const payload = await verifyJwt(token);
    const { toUserId, content } = await ctx.request.body.json();

    const [message] = messageService.createMessage({
      fromUserId: payload.userId,
      toUserId,
      content,
    });
    ctx.response.status = 201;
    ctx.response.body = message;
    return ctx.response;
  } catch (error: any) {
    ctx.response.status = 400;
    ctx.response.body = { error: error.message };
    return ctx.response;
  }
}

export async function getMessagesSent(ctx: Context) {
  const token = ctx.request.headers.get("Authorization")?.split(" ")[1];
  if (!token) {
    ctx.response.status = 401;
    ctx.response.body = { error: "Unauthorized" };
    return ctx.response;
  }

  try {
    const payload = await verifyJwt(token);
    const messages = messageService.getMessagesSentByUser({
      userId: payload.userId,
    });
    ctx.response.status = 200;
    ctx.response.body = messages;
    return ctx.response;
  } catch (error: any) {
    ctx.response.status = 400;
    ctx.response.body = { error: error.message };
    return ctx.response;
  }
}

export async function getMessagesRecieved(ctx: Context) {
  const token = ctx.request.headers.get("Authorization")?.split(" ")[1];
  if (!token) {
    ctx.response.status = 401;
    ctx.response.body = { error: "Unauthorized" };
    return ctx.response;
  }

  try {
    const payload = await verifyJwt(token);
    const [messages] = messageService.getMessagesRecievedByUser({
      userId: payload.userId,
    });

    ctx.response.status = 200;
    ctx.response.body = messages;
    return ctx.response;
  } catch (error: any) {
    ctx.response.status = 400;
    ctx.response.body = { error: error.message };
    return ctx.response;
  }
}

export function getAllMessages(ctx: Context) {
  try {
    const [messages] = messageService.getMessages();

    ctx.response.status = 200;
    ctx.response.body = { messages };
    return ctx.response;
  } catch (error: any) {
    ctx.response.status = 400;
    ctx.response.body = { error: error.message };
    return ctx.response;
  }
}
