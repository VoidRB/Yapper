// deno-lint-ignore-file no-explicit-any

import { MessageService } from "../../services/message/service.ts";
import { verifyJwt } from "./sessions.ts";
import { Request, Response } from "express";

const messageService = new MessageService();

export async function sendMessage(
  req: Request,
  res: Response,
): Promise<Response> {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const payload = await verifyJwt(token);
    const { toUserId, content } = await req.json();

    const [message] = await messageService.createMessage({
      fromUserId: payload.userId,
      toUserId,
      content,
    });

    return res.status(201).json(message);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
}

export async function getMessagesSent(
  req: Request,
  res: Response,
): Promise<Response> {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const payload = await verifyJwt(token);
    const messages = messageService.getMessagesSentByUser({
      userId: payload.userId,
    });

    return res.status(200).json(messages);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
}

export async function getMessagesRecieved(
  req: Request,
  res: Response,
): Promise<Response> {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const payload = await verifyJwt(token);
    const [messages] = messageService.getMessagesRecievedByUser({
      userId: payload.userId,
    });

    return res.status(200).json(messages);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
}

export function getAllMessages(req: Request, res: Response): Promise<Response> {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const [messages] = messageService.getMessages();

    return res.status(200).json(messages);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
}
