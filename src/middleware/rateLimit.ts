import rateLimit from 'express-rate-limit';

export const defaultRateLimiter = rateLimit({
	windowMs: 60 * 1000,
	max: 1000,
	message: 'Too many requests from this IP, please try again after 15 minutes',
	headers: true,
});
