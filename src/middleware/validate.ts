import type { NextFunction, Request, Response } from 'express';
import type { ZodType } from 'zod';

export const validate = (schema: ZodType) => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<any> => {
		let dataToValidate;

		if (req.method === 'GET') {
			dataToValidate = { ...req.query, ...req.params };
		} else {
			dataToValidate = req.body;
		}

		const result = await schema.safeParse(dataToValidate);

		if (!result.success) {
			return res.status(400).json({
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				errors: result.error.errors.map((error: any) => ({
					message: error.message,
					path: error.path.join('.'),
				})),
			});
		}

		next();
	};
};
