import { z } from "zod";

export const messageSchema = z.object({
  fromUserId: z.number(),
  toUserId: z.number(),
  content: z.string(),
});

export type Message = z.infer<typeof messageSchema>;

export const messageTuple = z.tuple([
  z.number(),
  z.number(),
  z.string(),
]);

export type MessageTuple = z.infer<typeof messageTuple>;

export const messagesSpec = z.array(messageSchema);

export type MessagesSpec = z.infer<typeof messagesSpec>;

export const listMessagesByUserIdSpec = z.object({
  userId: z.number(),
});

export type ListMessagesByUserId = z.infer<typeof listMessagesByUserIdSpec>;
