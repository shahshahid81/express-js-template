import rateLimit from 'express-rate-limit';
import { RedisStore } from 'rate-limit-redis';
import { createClient } from 'redis';
import { logger } from '../logger';
import { NextFunction, Request, Response } from 'express';

export async function defaultRateLimiter(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const redisClient = createClient({
		url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
	});

	try {
		await redisClient.connect();
		rateLimit({
			windowMs: 60 * 1000,
			max: 2,
			message:
				'Too many requests from this IP, please try again after sometime',
			standardHeaders: true,
			legacyHeaders: false,
			store: new RedisStore({
				sendCommand: (...args: string[]) => redisClient.sendCommand(args),
			}),
		})(req, res, next);
	} catch (error: unknown) {
		logger.error('Something went wrong while connecting with redis', error);
		next();
	}
}
