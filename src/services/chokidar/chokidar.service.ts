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

			ignored: /^\./,
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
				this.saveDateFile.appendToFile(`added: ', ${path}`);
			})
			.on('change', (path) => {
				this.saveDateFile.appendToFile(`Changed: ', ${path}`);
			})
			.on('unlink', (path) => {
				this.saveDateFile.appendToFile(`Removed: ', ${path}`);
			})
			.on('error', (error) => {
				l.warn('Error happened', error);
			});
	}
}

//ignored: /^\./
