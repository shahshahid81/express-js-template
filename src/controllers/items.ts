import { CreateItem } from '../validation/createItem';
import { UpdateItem } from '../validation/updateItem';

const items: {
	id: number;
	name: string;
	description: string;
}[] = [
	{ id: 1, name: 'Item 1', description: 'First item' },
	{ id: 2, name: 'Item 2', description: 'Second item' },
];

export const createItem = ({ name, description }: CreateItem) => {
	const id = (items?.length ?? 0) > 0 ? items[items.length - 1]!.id + 1 : 1;
	const newItem = {
		id,
		name,
		description,
	};
	items.push(newItem);
};

export const getAllItems = () => {
	return items;
};

export const getItem = (id: string) => {
	return items.find((i) => i.id.toString() === id);
};

export const updateItem = ({ id, name, description }: UpdateItem) => {
	const itemIndex = items.findIndex((i) => i.id === id);
	if (itemIndex === -1) {
		return null;
	}

	if (name) {
		items[itemIndex]!.name = name;
	}

	if (description) {
		items[itemIndex]!.description = description;
	}

	return items[itemIndex];
};

export const deleteItem = (id: string) => {
	const itemIndex = items.findIndex((i) => i.id.toString() === id);

	if (itemIndex === -1) {
		return null;
	}

	const deletedItem = items.splice(itemIndex, 1);
	return deletedItem[0];
};
