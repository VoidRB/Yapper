import db from "../../db/db.ts";

import type { User, UserTuple } from "./model.ts";
import type {
  CreateUserByUserId,
  GetSingleUserByEmail,
  GetSingleUserById,
} from "./model.ts";

export const createUserByUserStatement = db.prepareQuery<
  UserTuple,
  User,
  CreateUserByUserId
>(
  "INSERT INTO users ( email, hashedPassword ) VALUES ( :email, :hashedPassword ) RETURNING * ;",
);

export const getSingleUserByIdStatement = db.prepareQuery<
  UserTuple,
  User,
  GetSingleUserById
>("SELECT * FROM users WHERE id = :id ;");

export const getSingleUserByEmailStatement = db.prepareQuery<
  UserTuple,
  User,
  GetSingleUserByEmail
>("SELECT * FROM users WHERE email = :email ;");

export const getAllUsersStatement = db.prepareQuery<UserTuple, User>(
  "SELECT * FROM users;",
);
