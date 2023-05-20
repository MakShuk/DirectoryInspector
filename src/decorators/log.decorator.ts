export function logReturnValue(
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
