import { z } from 'zod';

export const createItemSchema = z.object({
	name: z
		.string({ message: 'Name is required' })
		.min(1, { message: 'Name is required' })
		.max(255, { message: 'Name should not exceed 255 characters' }),
	description: z
		.string({ message: 'Description is required' })
		.min(1, { message: 'Description is required' })
		.max(500, { message: 'Description should not exceed 500 characters' }),
});

export type CreateItem = z.infer<typeof createItemSchema>;
