import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
	await db.schema
		.createTable('user')
		.addColumn('id', 'integer', (col) => col.primaryKey().autoIncrement())
		.addColumn('email', 'text', (col) => col.notNull())
		.addColumn('passwordHash', 'text', (col) => col.notNull())
		.addColumn('created_at', 'text', (col) =>
			col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
		)
		.execute();

	await db.schema
		.createTable('session')
		.addColumn('id', 'integer', (col) => col.primaryKey().autoIncrement())
		.addColumn('ip', 'text', (col) => col.notNull())
		.addColumn('userAgent', 'text', (col) => col.notNull())
		.addColumn('token', 'text', (col) => col.notNull())
		.addColumn('userId', 'integer', (col) =>
			col.references('user.id').onDelete('cascade').notNull()
		)
		.addColumn('created_at', 'text', (col) =>
			col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
		)
		.execute();

	await db.schema
		.createTable('message')
		.addColumn('id', 'integer', (col) => col.primaryKey().autoIncrement())
		.addColumn('fromUserId', 'integer', (col) =>
			col.references('user.id').onDelete('cascade').notNull()
		)
		.addColumn('toUserId', 'integer', (col) =>
			col.references('user.id').onDelete('cascade').notNull()
		)
		.addColumn('content', 'text', (col) => col.notNull())
		.addColumn('created_at', 'text', (col) =>
			col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
		)
		.execute();
}

export async function down(db: Kysely<any>): Promise<void> {
	await db.schema.dropTable('message').execute();
	await db.schema.dropTable('session').execute();
	await db.schema.dropTable('user').execute();
} 