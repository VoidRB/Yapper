import db from "../../db/db.ts";

import type { User, UserTuple } from "./model.ts";
import type {
  CreateUserByUserSpec,
  GetSingleUserByEmailSpec,
  GetSingleUserByIDSpec,
} from "./model.ts";

export const createUserByUserStatement = db.prepareQuery<
  UserTuple,
  User,
  CreateUserByUserSpec
>(
  "INSERT INTO users ( email, hashed_password ) VALUES ( :email, :hashed_password ) RETURNING * ;",
);

export const getSingleUserByIdStatement = db.prepareQuery<
  UserTuple,
  User,
  GetSingleUserByIDSpec
>("SELECT * FROM users WHERE id = :id ;");

export const getSingleUserByEmailStatement = db.prepareQuery<
  UserTuple,
  User,
  GetSingleUserByEmailSpec
>("SELECT * FROM users WHERE email = :email ;");

export const getAllUsersStatement = db.prepareQuery<UserTuple, User>(
  "SELECT * FROM users;",
);
