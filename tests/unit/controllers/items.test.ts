import * as ItemsController from '../../../src/controllers/items';

// jest.mock('../../../src/controllers/items', () => ({
//   __esModule: true,
//   ...jest.requireActual('../../../src/controllers/items'),
//   items: [{ id: 1, name: 'Test Name', description: 'Test Description' }],
// }));

// beforeEach(() => {
// 	jest.resetModules();
// });

// afterEach(() => {
// 	jest.clearAllMocks();
// });

describe('Items Controller', () => {
	describe('createItem', () => {
		test('It should Add item', () => {
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
	});
});
