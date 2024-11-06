import db from '../db/db.ts';
import { UserObj, UserTuple } from '../src/types/allTypes.ts';

export class UserService {
  constructor() {}

  getUser(id: number) {
    const query = db.prepareQuery<UserTuple, UserObj, { id: number }>(
      'SELECT * FROM users WHERE id = :id ;'
    );
    const user = query.firstEntry({ id: id });
    query.finalize();
    return user;
  }

  getUserByEmail(email: string) {
    const query = db.prepareQuery<UserTuple, UserObj, { email: string }>(
      'SELECT * FROM users WHERE email = :email;'
    );
    const user = query.firstEntry({ email: email });
    query.finalize;
    return user;
  }

  getUsers() {
    const query = db.prepareQuery<UserTuple, UserObj>('SELECT * FROM users ;');
    const allUsers = query.firstEntry();
    query.finalize();
    return allUsers;
  }
  createUser(data: { email: string; hashed_password: string }) {
    const query = db.prepareQuery<UserTuple, UserObj, typeof data>(
      'INSERT INTO users ( email, hashed_password ) VALUES ( :email, :hashed_password ) RETURNING * ;'
    );
    const newUser = query.firstEntry({
      email: data.email,
      hashed_password: data.hashed_password,
    });
    query.finalize();

    return newUser;
  }
}
