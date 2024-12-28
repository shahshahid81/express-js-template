import winston from 'winston';
import { ILogger } from './ILogger';

class Winston implements ILogger {
	private logger: winston.Logger;

	constructor() {
		this.logger = winston.createLogger({
			level: process.env.LOG_LEVEL || 'info',
			format: winston.format.combine(
				winston.format.colorize({ all: true }),
				winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
				winston.format.printf(({ timestamp, level, message }) => {
					return `${timestamp} ${level}: ${message}`;
				})
			),
			transports: [
				new winston.transports.Console(),
				new winston.transports.File({
					filename: 'logs/error.log',
					level: 'error',
				}),
				new winston.transports.File({
					filename: 'logs/log.log',
					level: 'info',
				}),
			],
		});
	}

	log(level: 'info' | 'debug' | 'warn' | 'error', message: string): void {
		this.logger.log(level, message);
	}

	debug(message: string): void {
		this.logger.debug(message);
	}

	info(message: string): void {
		this.logger.info(message);
	}

	warn(message: string): void {
		this.logger.warn(message);
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	error(message: string, error: any): void {
		this.logger.error(message, error);
	}
}

export default new Winston();
