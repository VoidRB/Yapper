import db from '../db/db.ts';

export class MessageService {
  constructor() {}

  async getMessagesSentByUser(userId: number) {
    const query = db.prepareQuery<
      [number, number, string],
      { fromUserId: number; toUserId: number; content: string },
      { userId: number }
    >('SELECT * FROM message where fromUserId = :userId ;');
    const messages = query.firstEntry({ userId: userId });
    query.finalize();
    return await messages;
  }

  async getMessagesReceivedByUser(userId: number) {
    const query = db.prepareQuery<
      [number, number, string],
      { fromUserId: number; toUserId: number; content: string },
      { userId: number }
    >('SELECT * FROM message where toUserId = :userId;');
    const messages = query.firstEntry({ userId: userId });
    query.finalize();
    return await messages;
  }

  async getMessages() {
    const query = db.prepareQuery<
      [number, number, string],
      { fromUserId: number; toUserId: number; content: string }
    >('SELECT * FROM message ;');
    const messages = query.firstEntry();
    query.finalize();
    return await messages;
  }

  async createMessage(data: {
    fromUserId: number;
    toUserId: number;
    content: string;
  }) {
    const query = db.prepareQuery<
      [number, number, string],
      { fromUserId: number; toUserId: number; content: string },
      { fromUserId: number; toUserId: number; content: string }
    >(
      'INSERT INTO messages ( fromUserId, toUserId, content ) VALUES ( :fromUserId, :toUserId, :content );'
    );
    const message = query.firstEntry({
      fromUserId: data.fromUserId,
      toUserId: data.toUserId,
      content: data.content,
    });
    query.finalize();
    return await message;
  }
}
