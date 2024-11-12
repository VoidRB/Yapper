import {
  CreateMessageByUserId,
  createMessageByUserIdSpec,
  type ListMessagesByUserId,
  listMessagesByUserIdSpec,
  type Message,
} from "./model.ts";
import {
  createMessage,
  getMessages,
  getMessagesRecievedByUserStatement,
  getMessagesSentByUserStatement,
} from "./statements.ts";

export class MessageService {
  constructor() {}

  async getMessagesSentByUser(data: ListMessagesByUserId): Promise<Message[]> {
    const { userId } = listMessagesByUserIdSpec.parse(data);
    const messages = getMessagesSentByUserStatement.allEntries({ userId });
    return await messages;
  }

  async getMessagesRecievedByUser(
    data: ListMessagesByUserId,
  ): Promise<Message[]> {
    const { userId } = listMessagesByUserIdSpec.parse(data);
    const messages = getMessagesRecievedByUserStatement.allEntries({ userId });
    return await messages;
  }

  async getMessages(): Promise<Message[]> {
    const messages = getMessages.allEntries();
    return await messages;
  }

  async createMessage(data: CreateMessageByUserId): Promise<Message[]> {
    const { fromUserId, toUserId, content } = createMessageByUserIdSpec.parse(
      data,
    );
    const message = createMessage.allEntries({ fromUserId, toUserId, content });
    return await message;
  }
}
