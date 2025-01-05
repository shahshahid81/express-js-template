import { CreateItem } from '../validation/createItem';
import { UpdateItem } from '../validation/updateItem';

type ItemDataType = {
	id: number;
	name: string;
	description: string;
};

export class Items {
	private static items = [
		{ id: 1, name: 'Item 1', description: 'First item' },
		{ id: 2, name: 'Item 2', description: 'Second item' },
	];
	static getItems(): ItemDataType[] {
		return this.items;
	}
}

export const createItem = ({ name, description }: CreateItem): ItemDataType => {
	const items = Items.getItems();
	const id = (items?.length ?? 0) > 0 ? items[items.length - 1]!.id + 1 : 1;
	const newItem = {
		id,
		name,
		description,
	};
	items.push(newItem);
	return newItem;
};

export const getAllItems = (): ItemDataType[] => {
	return Items.getItems();
};

export const getItem = (id: string): ItemDataType | undefined => {
	const items = Items.getItems();
	return items.find((i) => i.id.toString() === id);
};

export const updateItem = ({
	id,
	name,
	description,
}: UpdateItem): ItemDataType | undefined | null => {
	const items = Items.getItems();
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

export const deleteItem = (id: string): ItemDataType | undefined | null => {
	const items = Items.getItems();
	const itemIndex = items.findIndex((i) => i.id.toString() === id);

	if (itemIndex === -1) {
		return null;
	}

	const deletedItem = items.splice(itemIndex, 1);
	return deletedItem[0];
};
