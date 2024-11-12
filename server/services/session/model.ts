import { z } from "zod";

export const sessionSchema = z.object({
  id: z.number(),
  ip: z.string(),
  userAgent: z.string(),
  token: z.string(),
  userId: z.number(),
});

export type Session = z.infer<typeof sessionSchema>;

export const sessionTuple = z.tuple([
  z.number(),
  z.string(),
  z.string(),
  z.string(),
  z.number(),
]);

export type SessionTuple = z.infer<typeof sessionTuple>;

export const sessionSpec = z.array(sessionTuple);

export type SessionSpec = z.infer<typeof sessionSpec>;

export const createSessionByUserSpec = z.object({
  ip: z.string(),
  userAgent: z.string(),
  token: z.string(),
  userId: z.number(),
});

export type CreateSessionByUserSpec = z.infer<typeof createSessionByUserSpec>;
