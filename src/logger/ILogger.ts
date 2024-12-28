export interface ILogger {
	log(level: string, message: string): void;
	debug(message: string): void;
	info(message: string): void;
	warn(message: string): void;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	error(message: string, error?: any): void;
}
