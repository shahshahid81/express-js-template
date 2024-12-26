import rateLimit from 'express-rate-limit';

export const defaultRateLimiter = rateLimit({
	windowMs: 60 * 1000,
	max: 100,
	message: 'Too many requests from this IP, please try again after sometime',
	headers: true,
});
