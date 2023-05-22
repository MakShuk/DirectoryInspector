import { resolve } from 'path';
import fs from 'fs/promises';

export class FolderService {
	path: string;
	constructor(catalog: string) {
		this.path = resolve(__dirname, catalog, ``);
		this.isExists();
	}

	async getFileCount(): Promise<number | undefined> {
		try {
			const files = await fs.readdir(this.path);
			return files.length;
		} catch (err) {
			console.error(err);
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
