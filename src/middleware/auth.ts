import type { NextFunction, Request, Response } from 'express';
import { TokenList } from '../entity/TokenList';
import { AppDataSource } from '../typeorm/data-source';
import { hash } from '../utils/hash-utils';

export async function auth(
	req: Request,
	_res: Response,
	next: NextFunction
): Promise<void> {
	const authorization = req.headers.authorization || req.headers.Authorization;

	if (!authorization || typeof authorization !== 'string') {
		throw new Error('Missing authorization header');
	}

	const token = authorization.split(' ')[1];
	if (!token || typeof token !== 'string') {
		throw new Error('Missing authorization header');
	}
	try {
		// const user = await this.tokenListService.getUser(token);

		const tokenListRepository = AppDataSource.getRepository(TokenList);
		const existingTokenList = await tokenListRepository.find({
			relations: { user: true },
			where: { token: hash(token), user: { isActive: true } },
		});

		req.user = existingTokenList?.pop()?.user ?? null;
		req.token = token;
		next();
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		throw new Error(error?.message || 'Invalid token');
	}
}
