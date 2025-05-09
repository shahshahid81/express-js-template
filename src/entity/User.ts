import { DateTime } from 'luxon';
import { TokenList } from './TokenList';
import { getDateTransformer } from '../utils/date-transformer';
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	email: string;

	@Column()
	password: string;

	@Column({ default: true })
	isActive: boolean;

	@CreateDateColumn({
		type: 'timestamp',
		default: () => 'CURRENT_TIMESTAMP',
		transformer: getDateTransformer(),
	})
	createdAt: DateTime;

	@UpdateDateColumn({
		type: 'timestamp',
		default: () => 'CURRENT_TIMESTAMP',
		onUpdate: 'CURRENT_TIMESTAMP',
		transformer: getDateTransformer(),
	})
	updatedAt: DateTime;

	@OneToMany(() => TokenList, (token) => token.user)
	@JoinColumn({ name: 'id' })
	tokens?: TokenList[];
}
