import { RowObject } from 'sqlite';
import db from '../db/db.ts';

export class UserService {
  constructor() {}

  async getUser(id: number) {
    let user: RowObject | undefined = {};
    const query = db.prepareQuery<
      [number, string, string],
      { id: number; email: string; hashed_password: string },
      { id: number }
    >('SELECT * FROM users WHERE id = :id ;');
    user = query.firstEntry({ id: id });
    query.finalize();
    return await user;
  }

  async getUserByEmail(email: string) {
    let user: RowObject | undefined = {};
    const query = db.prepareQuery<
      [number, string, string],
      { id: number; email: string; hashed_password: string },
      { email: string }
    >('SELECT * FROM users WHERE email = :email;');
    user = query.firstEntry({ email: email });
    query.finalize;
    return await user;
  }

  async getUsers() {
    let allUsers: RowObject | undefined = {};
    const query = db.prepareQuery<
      [number, string, string],
      { id: number; email: string; hashed_password: string }
    >('SELECT * FROM users ;');
    allUsers = query.firstEntry();
    query.finalize();
    return await allUsers;
  }

  async createUser(data: { email: string; hashed_password: string }) {
    const query = db.prepareQuery<
      [string, string, number],
      { id: number; email: string; hashed_password: string },
      { email: string; hashed_password: string }
    >(
      'INSERT INTO users ( email, hashed_password ) VALUES ( :email, :hashed_password ) RETURNING * ;'
    );
    const newUser = query.firstEntry({
      email: data.email,
      hashed_password: data.hashed_password,
    });
    query.finalize();

    return await newUser;
  }
}
