import db from "../../db/db.ts";

import type { User, UserTuple } from "./model.ts";
import type { CreateUserByUserSpec } from "./model.ts";

export const createUserByUserStatement = db.prepareQuery<
  UserTuple,
  User,
  CreateUserByUserSpec
>(
  "INSERT INTO users ( email, hashed_password ) VALUES ( :email, :hashed_password ) RETURNING * ;",
);

export const getUserByEmailStatement = db.prepareQuery<
  UserTuple,
  User,
  CreateUserByUserSpec
>("SELECT * FROM users WHERE email = :email;");
