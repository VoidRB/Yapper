import { listMessagesByUserIdSpec, type Message, type ListMessagesByUserId } from './model.ts';
import { getMessagesSentByUserStatement } from './statements.ts';

export class MessageService {
	constructor() { }

	async getMessagesSentByUser(data: ListMessagesByUserId): Promise<Message[]> {
		const { userId } = listMessagesByUserIdSpec.parse(data);
		const messages = getMessagesSentByUserStatement.allEntries({ userId });
		return messages;
	}
}