import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../entity/User';
import { config } from '../config/env';
import { TokenList } from '../entity/TokenList';
import { CustomNamingStrategy } from './naming-strategy';

export const AppDataSource = new DataSource({
	type: 'postgres',
	host: config.DB_HOST!,
	port: config.DB_PORT!,
	username: config.DB_USERNAME!,
	password: config.DB_PASSWORD!,
	database: config.DB_NAME!,
	synchronize: false,
	logging: true,
	entities: [User, TokenList],
	migrations: ['src/migrations/**/*.ts'],
	migrationsTableName: 'tbl_migrations',
	subscribers: [],
	namingStrategy: new CustomNamingStrategy(),
});
