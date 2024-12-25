import { z } from 'zod';

export const updateItemSchema = z.object({
	id: z.number(),
	name: z
		.string({ message: 'Name should be string' })
		.min(1, { message: 'Name is required' })
		.max(255, { message: 'Name should not exceed 255 characters' })
		.optional(),
	description: z
		.string({ message: 'Description should be string' })
		.min(1, { message: 'Description is required' })
		.max(500, { message: 'Description should not exceed 500 characters' })
		.optional(),
});

export type UpdateItem = z.infer<typeof updateItemSchema>;
