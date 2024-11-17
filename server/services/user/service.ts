import {
  type CreateUserByUserId,
  createUserByUserSpec,
  type GetSingleUserByEmail,
  getSingleUserByEmailSpec,
  type GetSingleUserById,
  getSingleUserByIDSpec,
} from "./model.ts";

import {
  createUserByUserStatement,
  getAllUsersStatement,
  getSingleUserByEmailStatement,
  getSingleUserByIdStatement,
} from "./statements.ts";

export class UserService {
  constructor() {}

  createUser(data: CreateUserByUserId) {
    const { email, hashedPassword } = createUserByUserSpec.parse(data);
    const [user] = createUserByUserStatement.allEntries({
      email,
      hashedPassword,
    });
    return user;
  }

  getUserById(data: GetSingleUserById) {
    const { id } = getSingleUserByIDSpec.parse(data);
    const [user] = getSingleUserByIdStatement.allEntries({
      id,
    });

    return user;
  }
  getUserByEmail(data: GetSingleUserByEmail) {
    const { email } = getSingleUserByEmailSpec.parse(data);
    const [user] = getSingleUserByEmailStatement.allEntries({
      email,
    });

    return user;
  }

  getAllUsers() {
    const users = getAllUsersStatement.allEntries();
    return users;
  }
}
