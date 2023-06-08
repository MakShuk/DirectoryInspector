import { AxiosService } from './services/axios/axios.service';

export const newRes = async (): Promise<void> => {
	const url = 'https://github.com/MakShuk/DirectoryInspector/blob/main/settings/setting.json';
	const gitSetting = new AxiosService(url);
	const res = await gitSetting.get();
	console.log(res.data);
};
