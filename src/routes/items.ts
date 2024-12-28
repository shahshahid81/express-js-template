import express, { Request, Response } from 'express';
import { validate } from '../middleware/validate';
import { createItemSchema } from '../validation/createItem';
import {
	createItem,
	deleteItem,
	getAllItems,
	getItem,
	updateItem,
} from '../controllers/items';

const router = express.Router();

router.post(
	'/',
	validate(createItemSchema),
	(req: Request, res: Response): void => {
		const { name, description } = req.body;
		const newItem = createItem({ name, description });
		res.status(201).json({ item: newItem });
	}
);

router.get('/', (_req: Request, res: Response): void => {
	const items = getAllItems();
	res.status(200).json({ items });
});

router.get('/:id', (req: Request, res: Response): void => {
	const { id } = req.params;
	const item = getItem(id!);

	if (!item) {
		res.status(404).json({ message: 'Item not found.' });
		return;
	}

	res.status(200).json({ item });
});

router.put('/:id', (req: Request, res: Response): void => {
	const { id } = req.params;
	const { name, description } = req.body;

	const updatedItem = updateItem({ id: parseInt(id!), name, description });
	if (!updatedItem) {
		res.status(404).json({ message: 'Item not found.' });
		return;
	}

	res.status(200).json({ item: updatedItem });
});

router.delete('/:id', (req: Request, res: Response): void => {
	const { id } = req.params;
	const deletedItem = deleteItem(id!);
	if (!deletedItem) {
		res.status(404).json({ message: 'Item not found.' });
	}
	res.status(200).json({ message: 'Item deleted successfully.' });
});

export default router;
