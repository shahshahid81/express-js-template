import 'reflect-metadata';
import { config } from './config/env';
import bodyParser from 'body-parser';
import express, { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import authRouter from './routes/auth';
import itemsRouter from './routes/items';
import { requestLogger } from './middleware/requestLogger';
import { defaultRateLimiter } from './middleware/rateLimit';
import { AppDataSource } from './typeorm/data-source';
import { logger } from './logger';
import { Server } from 'http';
import { User } from './entity/User';

declare module 'express' {
	interface Request {
		user?: User | null;
		token?: string;
	}
}

const app = express();
const port = config.PORT;

app.use(helmet());
app.use(bodyParser.json());
app.use(defaultRateLimiter);
app.use(requestLogger);

app.use('/auth', authRouter);
app.use('/items', itemsRouter);

app.get('/', (_req, res) => {
	res.send('Express + TypeScript Server');
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
app.use((error: any, _req: Request, res: Response, _next: NextFunction) => {
	logger.error('Internal Server Error:', error);
	res.status(error.status || 500).json({
		message: error.message || 'Internal Server Error',
		stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
	});
});

export async function startServer(): Promise<Server | undefined> {
	try {
		await AppDataSource.initialize();
		const server = app.listen(port, () => {
			console.log(`[server]: Server is running at http://localhost:${port}`);
		});
		return server;
	} catch (error) {
		logger.error('An Error Occured while starting server', error);
		return;
	}
}

startServer();

export default app;
