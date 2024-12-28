import * as ItemsController from '../../../src/controllers/items';

afterEach(() => {
	jest.clearAllMocks();
});

describe('Items Controller', () => {
	describe('getAllItems', () => {
		test('It should return all items', () => {
			const payload = [
				{ id: 1, name: 'Test Name', description: 'Test Description' },
			];
			jest.spyOn(ItemsController.Items, 'getItems').mockReturnValue(payload);

			const items = ItemsController.getAllItems();

			expect(items).toStrictEqual(payload);
		});
	});

	describe('getOneItem', () => {
		test('It should return the item', () => {
			const data = {
				id: 1,
				name: 'Test Name',
				description: 'Test Description',
			};
			const payload = [data];
			jest.spyOn(ItemsController.Items, 'getItems').mockReturnValue(payload);

			const item = ItemsController.getItem('1');

			expect(item).toStrictEqual(data);
		});

		test('It should return undefined if no item found', () => {
			const payload = [
				{ id: 1, name: 'Test Name', description: 'Test Description' },
			];
			jest.spyOn(ItemsController.Items, 'getItems').mockReturnValue(payload);

			const item = ItemsController.getItem('2');

			expect(item).toBeUndefined();
		});
	});

	describe('createItem', () => {
		test('It should add item', () => {
			const payload = {
				name: 'Test Name',
				description: 'Test Description',
			};
			jest.spyOn(ItemsController, 'createItem');
			const response = ItemsController.createItem(payload);

			expect(ItemsController.createItem).toHaveBeenCalledWith(payload);
			expect(response).toHaveProperty('name', payload.name);
			expect(response).toHaveProperty('description', payload.description);
			expect(response).toHaveProperty('id');
			expect(typeof response.id).toBe('number');
			expect(response.id).toBeGreaterThanOrEqual(1);
		});
	});

	describe('updateItem', () => {
		test('update name', () => {
			const payload = {
				id: 1,
				name: 'Updated Test Name',
			};
			jest.spyOn(ItemsController, 'updateItem');

			const response = ItemsController.updateItem(payload);

			expect(ItemsController.updateItem).toHaveBeenCalledWith(payload);
			expect(response).toHaveProperty('name', payload.name);
			expect(response).toHaveProperty('id');
			expect(typeof response!.id).toBe('number');
			expect(response!.id).toBe(1);
		});

		test('update description', () => {
			const payload = {
				id: 1,
				description: 'Updated Test Description',
			};
			jest.spyOn(ItemsController, 'updateItem');

			const response = ItemsController.updateItem(payload);

			expect(ItemsController.updateItem).toHaveBeenCalledWith(payload);
			expect(response).toHaveProperty('description', payload.description);
			expect(response).toHaveProperty('id');
			expect(typeof response!.id).toBe('number');
			expect(response!.id).toBe(1);
		});

		test('should return null if no item found', () => {
			const payload = {
				id: 1,
				name: 'Updated Test Name',
			};
			jest.spyOn(ItemsController, 'updateItem');

			const response = ItemsController.updateItem(payload);

			expect(ItemsController.updateItem).toHaveBeenCalledWith(payload);
			expect(response).toHaveProperty('name', payload.name);
			expect(response).toHaveProperty('id');
			expect(typeof response!.id).toBe('number');
			expect(response!.id).toBe(1);
		});
	});

	describe('deleteItem', () => {
		test('It should delete the item', () => {
			const data = {
				id: 1,
				name: 'Test Name',
				description: 'Test Description',
			};
			const payload = [data];
			jest.spyOn(ItemsController.Items, 'getItems').mockReturnValue(payload);

			const item = ItemsController.deleteItem('1');

			expect(item).toStrictEqual(data);
		});

		test('It should return undefined if no item found', () => {
			const data = {
				id: 1,
				name: 'Test Name',
				description: 'Test Description',
			};
			const payload = [data];
			jest.spyOn(ItemsController.Items, 'getItems').mockReturnValue(payload);

			const item = ItemsController.getItem('2');

			expect(item).toBeUndefined();
		});
	});
});
