import {
	type CreateUserByUserSpec,
	createUserByUserSpec,
	type User,
} from "./model.ts";

import { createUserByUserStatement } from "./statements.ts";

export class UserService {
	constructor() {}

	async createUSer(data: CreateUserByUserSpec): Promise<User[]> {
		const { email, hashed_password } = createUserByUserSpec.parse(data);
		const user = createUserByUserStatement.allEntries({
			email,
			hashed_password,
		});
		return await user;
	}
}
