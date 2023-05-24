import { resolve } from 'path';
import fs from 'fs/promises';

export class FolderService {
	path: string;
	constructor(catalog: string) {
		this.path = resolve(__dirname, catalog, ``);
		this.isExists();
	}

	async getFileCount(): Promise<number> {
		try {
			const files = await fs.readdir(this.path);
			return files.length || 0;
		} catch (err) {
			console.error(err);
			return 0;
		}
	}

	async isExists(): Promise<boolean> {
		try {
			await fs.access(this.path);
			return true;
		} catch (err) {
			console.error(`FolderService: no such directory ${this.path}`);
			return false;
		}
	}
}
