import {
  type CreateUserByUserId,
  createUserByUserSpec,
  type GetSingleUserById,
  getSingleUserByIDSpec,
  type GetSingleUserByUsername,
  getSingleUserByUsernameSpec,
} from "./model.ts";

import {
  createUserByUserStatement,
  getAllUsersStatement,
  getSingleUserByIdStatement,
  getSingleUserByUsernameStatement,
} from "./statements.ts";

export class UserService {
  constructor() {}

  createUser(data: CreateUserByUserId) {
    const { username, hashedPassword } = createUserByUserSpec.parse(data);
    const [user] = createUserByUserStatement.allEntries({
      username,
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
  getUserByUsername(data: GetSingleUserByUsername) {
    const { username } = getSingleUserByUsernameSpec.parse(data);
    const [user] = getSingleUserByUsernameStatement.allEntries({
      username,
    });

    return user;
  }

  getAllUsers() {
    const users = getAllUsersStatement.allEntries();
    return users;
  }
}
