import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';

const SALT_ROUNDS = 12;

export function hash(value: string): string {
	return crypto.createHash('sha256').update(value).digest('hex');
}

export function hashPassword(password: string): Promise<string> {
	return bcrypt.hash(password, SALT_ROUNDS);
}

export function comparePassword(payload: {
	hashedPassword: string;
	plainPassword: string;
}): Promise<boolean> {
	return bcrypt.compare(payload.plainPassword, payload.hashedPassword);
}

export function generateToken(): string {
	const randomBytes = crypto.randomBytes(32);
	const hash = crypto
		.createHash('shake256', { outputLength: 8 })
		.update(randomBytes)
		.digest('hex');
	const token = randomBytes.toString('hex') + hash;
	return token;
}
