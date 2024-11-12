type UserObj = { id: number; email: string; hashed_password: string };
type UserTuple = [number, string, string];

type MsgTuple = [number, number, string];
type MsgObj = { fromUserId: number; toUserId: number; content: string };

type sessionTuple = [number, string, string, string, number];
type sessionObj = {
  id: number;
  ip: string;
  userAgent: string;
  token: string;
  userId: number;
};

export type { MsgObj, MsgTuple, sessionObj, sessionTuple, UserObj, UserTuple };
