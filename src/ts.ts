import chokidar from 'chokidar';

const watcher = chokidar.watch('C:Users/maksh/Downloads', { ignored: /^\./, persistent: true });
watcher
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

// дератор котрый декорирует конструктор

function logReturnValue(
	target: any,
	propertyKey: string,
	descriptor: PropertyDescriptor,
): PropertyDescriptor {
	const originalMethod = descriptor.value;
	descriptor.value = function (...args: any[]): any {
		const result = originalMethod.apply(this, args);
		console.log(`Return value of ${propertyKey}:`, result);
		return result;
	};
	return descriptor;
}

export class User {
	secret: number;
	constructor(public name: string, public age: number, secret: number) {
		this.secret = secret;
	}
	@logReturnValue
	public getPass(): string {
		return `${this.name}-${this.age}`;
	}
}

const maks = new User('Maks', 33, 100);

maks.getPass();
