import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import path from 'node:path';

const nodeEnv = process.env.NODE_ENV || 'development';
const envFilePath = path.resolve(__dirname, '../..', `.env.${nodeEnv}`);

dotenvExpand.expand(dotenv.config({ path: envFilePath }));

export const config = {
	DB_HOST: process.env.DB_HOST,
	DB_NAME: process.env.DB_NAME,
	DB_PASSWORD: process.env.DB_PASSWORD,
	DB_PORT: Number(process.env.DB_PORT),
	DB_USERNAME: process.env.DB_USERNAME,
	LOG_LEVEL: process.env.LOG_LEVEL,
	NODE_ENV: process.env.NODE_ENV,
	PORT: process.env.PORT,
	REDIS_HOST: process.env.REDIS_HOST,
	REDIS_PORT: process.env.REDIS_PORT,
};
