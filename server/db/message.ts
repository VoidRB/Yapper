import { Generated, Selectable, Insertable, Updateable } from 'kysely';

export type MessageTable = {
  id: Generated<number>;
  fromUserId: number;
  toUserId: number;
  content: string;
};

export type Message = Selectable<MessageTable>;
export type NewMessage = Insertable<MessageTable>;
export type MessageUpdate = Updateable<MessageTable>;
