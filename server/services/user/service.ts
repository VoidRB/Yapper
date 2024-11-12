import {
  type CreateUserByUserSpec,
  createUserByUserSpec,
  type GetSingleUserByEmailSpec,
  getSingleUserByEmailSpec,
  type GetSingleUserByIDSpec,
  getSingleUserByIDSpec,
  type User,
} from "./model.ts";

import {
  createUserByUserStatement,
  getAllUsersStatement,
  getSingleUserByEmailStatement,
  getSingleUserByIdStatement,
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

  async getUserById(data: GetSingleUserByIDSpec): Promise<User[]> {
    const { id } = getSingleUserByIDSpec.parse(data);
    const user = getSingleUserByIdStatement.allEntries({
      id,
    });

    return await user;
  }
  async getUserByEmail(data: GetSingleUserByEmailSpec): Promise<User[]> {
    const { email } = getSingleUserByEmailSpec.parse(data);
    const user = getSingleUserByEmailStatement.allEntries({
      email,
    });

    return await user;
  }

  async getAllUsers(): Promise<User[]> {
    const users = getAllUsersStatement.allEntries();
    return await users;
  }
}
