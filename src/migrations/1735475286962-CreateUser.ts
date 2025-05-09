import { MigrationInterface, QueryRunner, Table, TableUnique } from 'typeorm';

export class CreateUser1735475286962 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'tbl_users',
				columns: [
					{
						name: 'id',
						type: 'varchar',
						isPrimary: true,
						generationStrategy: 'uuid',
						default: 'gen_random_uuid()',
					},
					{
						name: 'email',
						type: 'varchar',
					},
					{
						name: 'password',
						type: 'varchar',
					},
					{
						name: 'is_active',
						type: 'boolean',
						default: 'true',
					},
					{
						name: 'created_at',
						type: 'timestamp with time zone',
						default: 'now()',
					},
					{
						name: 'updated_at',
						type: 'timestamp with time zone',
						default: 'now()',
					},
				],
			})
		);

		await queryRunner.createUniqueConstraint(
			'tbl_users',
			new TableUnique({ columnNames: ['email'] })
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('tbl_users');
	}
}
