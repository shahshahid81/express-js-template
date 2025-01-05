import request from 'supertest';
import app, { startServer } from '../../src/app';
import { Server } from 'http';

let server: Server | undefined;

beforeAll(async () => {
	server = await startServer();
});

afterAll(() => {
	server!.close();
});

describe('CRUD items', () => {
	describe('Get All Items', () => {
		test('It should get all the items', () => {
			return request(app)
				.get('/items')
				.expect(200)
				.expect({
					items: [
						{ id: 1, name: 'Item 1', description: 'First item' },
						{ id: 2, name: 'Item 2', description: 'Second item' },
					],
				});
		});
	});

	describe('Get One Item', () => {
		test('It should get item with id 1', () => {
			return request(app)
				.get('/items/1')
				.expect(200)
				.expect({
					item: { id: 1, name: 'Item 1', description: 'First item' },
				});
		});
	});

	describe('Create Item', () => {
		test('It should create item', async () => {
			const payload = {
				name: 'Test Name',
				description: 'Test Description',
			};
			const response = await request(app).post('/items').send(payload);

			expect(response.status).toBe(201);
			expect(response.body).toHaveProperty('item');
			expect(response.body.item).toHaveProperty('id');
			expect(response.body).toMatchObject({ item: payload });
		});
	});

	describe('Update Item', () => {
		test('It should update item', async () => {
			const payload = {
				name: 'Test Name',
				description: 'Test Description',
			};
			const response = await request(app).put('/items/1').send(payload);

			expect(response.status).toBe(200);
			expect(response.body).toHaveProperty('item');
			expect(response.body.item).toHaveProperty('id');
			expect(response.body).toMatchObject({ item: payload });
		});
	});

	describe('Delete One Item', () => {
		test('It should delete item with id 1', () => {
			return request(app).delete('/items/1').expect(200).expect({
				message: 'Item deleted successfully.',
			});
		});
	});
});
