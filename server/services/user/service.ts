import {
  type CreateUserByUserSpec,
  createUserByUserSpec,
  type User,
} from "./model.ts";

import {
  createUserByUserStatement,
  getUserByEmailStatement,
} from "./statements.ts";

export class UserService {
  constructor() {}

  async createUser(data: CreateUserByUserSpec): Promise<User[]> {
    const { email, hashed_password } = createUserByUserSpec.parse(data);
    const user = createUserByUserStatement.allEntries({
      email,
      hashed_password,
    });
    return await user;
  }

  async getUser(data: CreateUserByUserSpec): Promise<User[]> {
    const { email, hashed_password } = createUserByUserSpec.parse(data);
    const user = getUserByEmailStatement.allEntries({
      email,
      hashed_password,
    });

    return await user;
  }
}
