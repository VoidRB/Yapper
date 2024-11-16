import { z } from "zod";

const userSchema = z.object({
  id: z.number(),
  email: z.string(),
  hashedPassword: z.string(),
});

export type User = z.infer<typeof userSchema>;

export const userTuple = z.tuple([z.number(), z.string(), z.string()]);

export type UserTuple = z.infer<typeof userTuple>;

export const userSpec = z.array(userTuple);

export type UserSpec = z.infer<typeof userSpec>;

export const createUserByUserSpec = z.object({
  email: z.string().email(),
  hashedPassword: z.string(),
});

export type CreateUserByUserId = z.infer<typeof createUserByUserSpec>;

export const getSingleUserByIDSpec = z.object({
  id: z.number(),
});

export type GetSingleUserById = z.infer<typeof getSingleUserByIDSpec>;

export const getSingleUserByEmailSpec = z.object({
  email: z.string().email(),
});

export type GetSingleUserByEmail = z.infer<typeof getSingleUserByEmailSpec>;
