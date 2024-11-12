import db from "../../db/db.ts";
import type { CreateMessageByUserId, Message, MessageTuple } from "./model.ts";
import type { ListMessagesByUserId } from "./model.ts";

export const getMessagesSentByUserStatement = db.prepareQuery<
  MessageTuple,
  Message,
  ListMessagesByUserId
>("SELECT * FROM message WHERE fromUserId = :userId;");

export const getMessagesRecievedByUserStatement = db.prepareQuery<
  MessageTuple,
  Message,
  ListMessagesByUserId
>("SELECT * FROM message WHERE toUserId = :userId;");

export const getMessages = db.prepareQuery<MessageTuple, Message>(
  "SELECT * FROM message ;",
);

export const createMessage = db.prepareQuery<
  MessageTuple,
  Message,
  CreateMessageByUserId
>(
  "INSERT INTO message ( fromUserId, toUserId, content ) VALUES ( :fromUserId, :toUserId, :content )",
);
