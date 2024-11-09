import db from "../db/db.ts";

import { MsgObj, MsgTuple } from "../src/types/allTypes.ts";

export class MessageService {
  constructor() {}

  getMessagesSentByUser(userId: number) {
    const query = db.prepareQuery<MsgTuple, MsgObj, { userId: number }>(
      "SELECT * FROM message where fromUserId = :userId ;",
    );
    const messages = query.firstEntry({ userId: userId });
    query.finalize();
    return messages;
  }

  getMessagesReceivedByUser(userId: number) {
    const query = db.prepareQuery<MsgTuple, MsgObj, { userId: number }>(
      "SELECT * FROM message where toUserId = :userId;",
    );
    const messages = query.firstEntry({ userId: userId });
    query.finalize();
    return messages;
  }

  getMessages() {
    const query = db.prepareQuery<MsgTuple, MsgObj>("SELECT * FROM message ;");
    const messages = query.firstEntry();
    query.finalize();
    return messages;
  }

  createMessage(data: {
    fromUserId: number;
    toUserId: number;
    content: string;
  }) {
    const query = db.prepareQuery<MsgTuple, MsgObj, typeof data>(
      "INSERT INTO message ( fromUserId, toUserId, content ) VALUES ( :fromUserId, :toUserId, :content );",
    );
    const message = query.firstEntry({
      fromUserId: data.fromUserId,
      toUserId: data.toUserId,
      content: data.content,
    });
    query.finalize();
    return message;
  }
}
