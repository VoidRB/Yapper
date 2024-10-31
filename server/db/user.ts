import {
	Generated,
	Selectable,
	Insertable,
	Updateable,
} from 'kysely'

export type UserTable = {
	id: Generated<number>
	email: string
	passwordHash: string
}

export type User = Selectable<UserTable>;
export type NewUser = Insertable<UserTable>;
export type UserUpdate = Updateable<UserTable>;
