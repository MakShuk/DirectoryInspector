import chokidar from 'chokidar';
import { FileService } from '../file/fileService';
import { l } from '../logger/logger.service';

export class ChokidarService {
	private watcher: chokidar.FSWatcher;
	constructor(private pathWatchFolder: string, private saveDateFile: FileService) {
		this.init();
	}

	private init(): void {
		this.watcher = chokidar.watch(this.pathWatchFolder, {
			persistent: true,

			ignored: /(\.log|\.txt|\.tmp|\.db)$/i,
			ignoreInitial: true,
			followSymlinks: true,
			cwd: '.',
			disableGlobbing: false,

			usePolling: false,
			interval: 100,
			binaryInterval: 300,
			alwaysStat: false,
			depth: 99,
			awaitWriteFinish: {
				stabilityThreshold: 2000,
				pollInterval: 100,
			},

			ignorePermissionErrors: true,
			atomic: true,
		});
	}

	watchAll(): void {
		this.watcher
			.on('add', (path) => {
				this.saveDateFile.appendToFile(`${this.getDate()} added: ${path}`);
			})
			.on('change', (path) => {
				this.saveDateFile.appendToFile(`${this.getDate()} Changed: ${path}`);
			})
			.on('unlink', (path) => {
				this.saveDateFile.appendToFile(`${this.getDate()} Removed: ${path}`);
			})
			.on('error', (error) => {
				l.warn('Error happened', error);
			});
	}

	private getDate(): string {
		const date = new Date();
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');
		const hours = String(date.getHours()).padStart(2, '0');
		const minutes = String(date.getMinutes()).padStart(2, '0');
		return `${year}-${month}-${day} ${hours}:${minutes}`;
	}
}
