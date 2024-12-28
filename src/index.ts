import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import path from 'node:path';
import bodyParser from 'body-parser';

const nodeEnv = process.env.NODE_ENV || 'development';
const envFilePath = path.resolve(__dirname, '..', `.env.${nodeEnv}`);

dotenvExpand.expand(dotenv.config({ path: envFilePath }));

import express from 'express';
import helmet from 'helmet';
import itemsRouter from './routes/items';
import { requestLogger } from './middleware/requestLogger';
import { defaultRateLimiter } from './middleware/rateLimit';

const app = express();
const port = process.env.PORT;

app.use(helmet());
app.use(bodyParser.json());
app.use(defaultRateLimiter);
app.use(requestLogger);

app.use('/items', itemsRouter);

app.get('/', (_req, res) => {
	res.send('Express + TypeScript Server');
});

export const server = app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
});

export default app;
