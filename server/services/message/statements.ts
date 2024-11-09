import db from "../../db/db.ts";
import type { Message, MessageTuple } from "./model.ts";
import type { ListMessagesByUserId } from "./model.ts";

export const getMessagesSentByUserStatement = db.prepareQuery<
  MessageTuple,
  Message,
  ListMessagesByUserId
>("SELECT * FROM message WHERE fromUserId = :userId;");
