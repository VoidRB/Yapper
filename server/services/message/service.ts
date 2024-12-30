import {
  type CreateMessageByUserId,
  createMessageByUserIdSpec,
  type ListMessagesByUserId,
  listMessagesByUserIdSpec,
} from "./model.ts";
import {
  createMessage,
  getMessages,
  getMessagesRecievedByUserStatement,
  getMessagesSentByUserStatement,
} from "./statements.ts";

export class MessageService {
  constructor() {}

  getMessagesSentByUser(data: ListMessagesByUserId) {
    const { userId } = listMessagesByUserIdSpec.parse(data);
    const messages = getMessagesSentByUserStatement.allEntries({ userId });
    return messages;
  }

  getMessagesRecievedByUser(data: ListMessagesByUserId) {
    const { userId } = listMessagesByUserIdSpec.parse(data);
    const messages = getMessagesRecievedByUserStatement.allEntries({ userId });
    return messages;
  }

  getMessages() {
    const messages = getMessages.allEntries();
    return messages;
  }

  createMessage(data: CreateMessageByUserId) {
    const { fromUserId, toUserId, content } = createMessageByUserIdSpec.parse(
      data,
    );
    const message = createMessage.allEntries({
      fromUserId,
      toUserId,
      content,
    });
    return message;
  }
}
