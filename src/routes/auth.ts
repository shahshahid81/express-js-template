import express, { NextFunction, Request, Response } from 'express';
import { validate } from '../middleware/validate';
import { RegisterUser, registerUserSchema } from '../validation/registerUser';
import { loginUser, registerUser } from '../controllers/users';
import { LoginUser, loginUserSchema } from '../validation/loginUser';
import { auth } from '../middleware/auth';
import { AppDataSource } from '../typeorm/data-source';
import { hash } from '../utils/hash-utils';
import { TokenList } from '../entity/TokenList';

const router = express.Router();

router.post(
	'/register',
	validate(registerUserSchema),
	async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		try {
			const { email, password, confirmPassword } = req.body as RegisterUser;
			const newUser = await registerUser({ email, password, confirmPassword });
			res.status(201).json({
				user: {
					email: newUser.email,
					isActive: newUser.isActive,
					created_at: newUser.createdAt,
					updatedAt: newUser.updatedAt,
				},
			});
			return;
		} catch (error) {
			next(error);
		}
	}
);

router.post(
	'/login',
	validate(loginUserSchema),
	async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		try {
			const { email, password } = req.body as LoginUser;
			const token = await loginUser({ email, password });
			res.status(201).json({ token });
			return;
		} catch (error) {
			next(error);
		}
	}
);

router.post(
	'/logout',
	auth,
	async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		try {
			console.log(req.token);
			if (req.token) {
				await AppDataSource.getRepository(TokenList)
					.createQueryBuilder()
					.delete()
					.where({ token: hash(req.token) })
					.execute();
			}
			res.status(200).json({ success: true });
			return;
		} catch (error) {
			next(error);
		}
	}
);

export default router;
