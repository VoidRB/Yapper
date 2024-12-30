import db from "../../db/db.ts";

import type { User, UserTuple } from "./model.ts";
import type {
  CreateUserByUserId,
  GetSingleUserById,
  GetSingleUserByUsername,
} from "./model.ts";

export const createUserByUserStatement = db.prepareQuery<
  UserTuple,
  User,
  CreateUserByUserId
>(
  "INSERT INTO users ( username, hashedPassword ) VALUES ( :username, :hashedPassword ) RETURNING * ;",
);

export const getSingleUserByIdStatement = db.prepareQuery<
  UserTuple,
  User,
  GetSingleUserById
>("SELECT id,username,hashedPassword FROM users WHERE id = :id ;");

export const getSingleUserByUsernameStatement = db.prepareQuery<
  UserTuple,
  User,
  GetSingleUserByUsername
>("SELECT id,username,hashedPassword FROM users WHERE username = :username ;");

export const getAllUsersStatement = db.prepareQuery<UserTuple, User>(
  "SELECT id,username FROM users;",
);
