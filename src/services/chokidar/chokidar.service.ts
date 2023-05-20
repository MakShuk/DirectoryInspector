import chokidar from 'chokidar';
import { logReturnValue } from '../decorators/log.decorator';

export class ChokidarService {
	private watcher: chokidar.FSWatcher;
	constructor(private path: string) {
		this.init();
	}

	private init(): void {
		this.watcher = chokidar.watch(this.path, { ignored: /^\./, persistent: true });
	}

	watchAll(): void {
		this.watcher
			.on('add', function (path) {
				console.log('File', path, 'has been added');
			})
			.on('change', function (path) {
				console.log('File', path, 'has been changed');
			})
			.on('unlink', function (path) {
				console.log('File', path, 'has been removed');
			})
			.on('error', function (error) {
				console.error('Error happened', error);
			});
	}
}
