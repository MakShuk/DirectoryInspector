import { ChokidarService } from './services/chokidar/chokidar.service';
import { FileService } from './services/file/fileService';
import { FolderService } from './services/folder/folderService';
import { l } from './services/logger/logger.service';

const pathSaveLogFolder = 'E:/log';
const pathAppDataFolder = 'C:/Users/maksh/AppData/Local';
const pathDocumentFolder = 'C:/Users/maksh/OneDrive/Documents';

function generateFilename(): string {
	const date = new Date();
	const randomNum = Math.floor(Math.random() * 1000);
	const filename = `${date.toISOString().slice(0, 10)}-${randomNum}.txt`;
	return filename;
}

const start = async (): Promise<void> => {
	const saveLogFolder = new FolderService(pathSaveLogFolder);
	const appDataFolder = new FolderService(pathAppDataFolder);
	const documentFolder = new FolderService(pathDocumentFolder);

	const saveLogFile = new FileService(generateFilename(), saveLogFolder.path);

	const watcherDataFolder = new ChokidarService(appDataFolder.path, saveLogFile);
	const watcherDocumentFolder = new ChokidarService(documentFolder.path, saveLogFile);

	watcherDataFolder.watchAll();
	watcherDocumentFolder.watchAll();
};

start();
