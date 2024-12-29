import {
	MigrationInterface,
	QueryRunner,
	Table,
	TableForeignKey,
	TableUnique,
} from 'typeorm';

export class CreateTokenList1735478765723 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'tbl_token_lists',
				columns: [
					{
						name: 'id',
						type: 'varchar',
						isPrimary: true,
						generationStrategy: 'uuid',
						default: 'gen_random_uuid()',
					},
					{
						name: 'user_id',
						type: 'varchar',
					},
					{
						name: 'token',
						type: 'varchar',
					},
					{
						name: 'expires_at',
						type: 'timestamp with time zone',
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
			'tbl_token_lists',
			new TableUnique({ columnNames: ['user_id', 'token'] })
		);

		await queryRunner.createForeignKey(
			'tbl_token_lists',
			new TableForeignKey({
				name: 'tbl_token_list_user_id',
				columnNames: ['user_id'],
				referencedColumnNames: ['id'],
				referencedTableName: 'tbl_users',
				onDelete: 'CASCADE',
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('tbl_token_lists');
	}
}
