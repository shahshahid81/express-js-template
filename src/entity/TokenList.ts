import { DateTime } from 'luxon';
import { User } from './User';
import { getDateTransformer } from '../utils/date-transformer';
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity()
export class TokenList extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	user_id: string;

	@ManyToOne(() => User, (user) => user.tokens)
	@JoinColumn({ name: 'user_id' })
	user: User;

	@Column()
	token: string;

	@Column({ type: 'timestamp', transformer: getDateTransformer() })
	expiresAt: DateTime;

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
}
