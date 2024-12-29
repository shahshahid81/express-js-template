import { z } from 'zod';

export const registerUserSchema = z
	.object({
		email: z
			.string({ message: 'Email is required' })
			.email({ message: 'Enter valid email address' }),
		password: z
			.string({ message: 'Password is required' })
			.min(8, { message: 'Password should be minimum 8 characters long' })
			.max(64, { message: 'Password should not exceed 64 characters' }),
		confirmPassword: z
			.string({ message: 'Password is required' })
			.min(8, { message: 'Password should be minimum 8 characters long' })
			.max(64, { message: 'Password should not exceed 64 characters' }),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ['confirmPassword'],
	});

export type RegisterUser = z.infer<typeof registerUserSchema>;
