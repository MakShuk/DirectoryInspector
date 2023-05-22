import fs from 'fs/promises';
import { WriteStream, createWriteStream, createReadStream, ReadStream } from 'fs';
import { resolve } from 'path';
import { WriteData } from './fileService.type';

export class FileService {
	path: string;
	constructor(private fileName: string, catalog: string) {
		this.path = resolve(__dirname, catalog, `${fileName}`);
	}

	async writeJsonFile(data: WriteData): Promise<void> {
		try {
			const dataJson = JSON.stringify(data);
			await fs.writeFile(this.path, dataJson);
			console.log(`Data written to ${this.fileName}`);
		} catch (error) {
			console.error(error);
		}
	}
	async writeFile(data: WriteData): Promise<void> {
		fs.writeFile(this.path, data)
			.then(() => console.log(`Data written to ${this.fileName}`))
			.catch((err) => console.error(err));
	}

	async readJsonFile(): Promise<any> {
		try {
			const data = await fs.readFile(this.path, { encoding: 'utf-8' });
			const jsonData = JSON.parse(data);
			return jsonData;
		} catch (err) {
			console.error(err);
			return null;
		}
	}

	createWriteStream(): WriteStream {
		return createWriteStream(this.path);
	}

	createReadStream(): ReadStream {
		return createReadStream(this.path);
	}

	async appendToFile(data: string | Uint8Array): Promise<void> {
		try {
			await fs.appendFile(this.path, `\n${data}`);
		} catch (err) {
			console.error(err);
		}
	}

	async clearFile(): Promise<void> {
		await this.writeFile('');
	}

	delete(): Promise<string> {
		return new Promise((resolve, reject) => {
			fs.unlink(this.path)
				.then(() => resolve(`File delete ${this.path}`))
				.catch((err) => reject(err));
		});
	}
}
