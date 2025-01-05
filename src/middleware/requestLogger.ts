import { NextFunction, Request, Response } from 'express';
import { logger } from '../logger';

export function requestLogger(
	req: Request,
	res: Response,
	next: NextFunction
): void {
	const start = Date.now();

	res.on('finish', () => {
		const responseTime = Date.now() - start;
		const { method, url, ip, headers, body } = req;
		const { statusCode } = res;

		logger.info(
			JSON.stringify({
				method,
				url,
				ip,
				statusCode,
				responseTime,
				headers,
				body: JSON.stringify(body),
			})
		);
	});

	next();
}
