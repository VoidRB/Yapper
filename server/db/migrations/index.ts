import { Migrator, FileMigrationProvider, FileMigrationProviderFS, FileMigrationProviderPath } from "kysely";
import { dirname, fromFileUrl } from "@std/path"
import { db } from "../index.ts";

const __dirname = dirname(fromFileUrl(import.meta.url));

class DenoFileMigrationProviderFS implements FileMigrationProviderFS {
	async readdir(path: string): Promise<string[]> {
		const paths = [];

		for await (const entry of Deno.readDir(path)) {
			paths.push(entry.name);
		}

		return paths;
	}
}

export class DenoFileMigrationProviderPath implements FileMigrationProviderPath {
	join(...paths: string[]): string {
		return paths.join("/");
	}
}

const migrator = new Migrator({
	db,
	provider: new FileMigrationProvider({
		fs: new DenoFileMigrationProviderFS(),
		path: new DenoFileMigrationProviderPath(),
		migrationFolder: `${__dirname}/migrations`,
	}),
});

export async function migrateToLatest() {
	const { error, results } = await migrator.migrateToLatest();

	results?.forEach((it) => {
		if (it.status === 'Success') {
			console.log(`migration "${it.migrationName}" was executed successfully`);
		} else if (it.status === 'Error') {
			console.error(`failed to execute migration "${it.migrationName}"`);
		}
	});

	if (error) {
		console.error('failed to migrate');
		console.error(error);
		Deno.exit(1);
	}
}

try {
	await migrateToLatest();
} catch (e) {
	console.error("Failed to migrate database", e)
}
