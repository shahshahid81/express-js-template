import { z } from 'zod';

export const loginUserSchema = z.object({
	email: z
		.string({ message: 'Email is required' })
		.email({ message: 'Enter valid email address' }),
	password: z
		.string({ message: 'Password is required' })
		.min(8, { message: 'Password should be minimum 8 characters long' })
		.max(64, { message: 'Password should not exceed 64 characters' }),
});

export type LoginUser = z.infer<typeof loginUserSchema>;
