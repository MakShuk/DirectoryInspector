import { ChokidarService } from './chokidar/chokidar.service';

const path = 'C:Users/maksh/Downloads';
const path2 = 'C:/Users/maksh/OneDrive/Рабочий стол';

const local = new ChokidarService(path);
const node = new ChokidarService(path2);

local.watchAll();
node.watchAll();
