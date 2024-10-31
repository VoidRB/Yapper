import {
	Generated,
	Selectable,
	Insertable,
	Updateable,
} from 'kysely'

export type SessionTable = {
	id: Generated<number>
	ip: string
	userAgent: string
	token: string
	userId: number
}

export type Session = Selectable<SessionTable>;
export type NewSession = Insertable<SessionTable>;
export type SessionUpdate = Updateable<SessionTable>;
