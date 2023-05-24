import { ChokidarService } from './services/chokidar/chokidar.service';
import { FileService } from './services/file/fileService';
import { FolderService } from './services/folder/folderService';
import { l } from './services/logger/logger.service';

const settings = new FileService('setting.json', './../../../settings');

const generateFilename = (counter: number): string => {
	const date = new Date();
	const filename = `${date.toISOString().slice(0, 10)}-${counter + 1}.txt`;
	return filename;
};

const init = async (
	watchFolder: string,
	saveFolderPath: string,
	counter: number,
): Promise<void> => {
	const watcherFolder = new FolderService(watchFolder);
	const saveLogFile = new FileService(generateFilename(counter), saveFolderPath);
	const watcher = new ChokidarService(watcherFolder.path, saveLogFile);
	watcher.watchAll();
};

const start = async (): Promise<void> => {
	const path = await settings.readJsonFile();
	const saveLogFolder = new FolderService(path.saveFolder);
	const counter = await saveLogFolder.getFileCount();
	l.warn(path.watch);
	path.watch.forEach((path: string) => {
		init(path, saveLogFolder.path, counter);
	});
};

start();
