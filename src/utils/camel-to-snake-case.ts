export function camelToSnakeCase(str: string): string {
	const snakeCaseValue = str.replace(
		/[A-Z]/g,
		(letter) => `_${letter.toLowerCase()}`
	);
	return snakeCaseValue.length && snakeCaseValue[0] === '_'
		? snakeCaseValue.substring(1)
		: snakeCaseValue;
}
