import { DateTime } from 'luxon';
import { User } from '../entity/User';
import {
	comparePassword,
	generateToken,
	hash,
	hashPassword,
} from '../utils/hash-utils';
import { LoginUser } from '../validation/loginUser';
import { RegisterUser } from '../validation/registerUser';
import { TokenList } from '../entity/TokenList';
import { AppDataSource } from '../typeorm/data-source';

export async function registerUser(payload: RegisterUser): Promise<User> {
	const existingUser = await User.findOneBy({ email: payload.email });
	if (existingUser) {
		throw new Error('User already exists!');
	}

	const user = new User();
	user.email = payload.email;
	user.password = await hashPassword(payload.password);
	await user.save();
	return user;
}

export async function loginUser(
	payload: LoginUser
): Promise<{ token: string }> {
	const existingUser = await User.findOneBy({ email: payload.email });
	if (!existingUser) {
		throw new Error('User not found!');
	}
	const isPasswordEqual = await comparePassword({
		plainPassword: payload.password,
		hashedPassword: existingUser.password,
	});

	if (!isPasswordEqual) {
		throw new Error('Incorrect Password');
	}

	const token = generateToken();
	const oneHourLater = DateTime.now().plus({ hour: 1 });
	const tokenList = new TokenList();
	Object.assign(tokenList, {
		user_id: existingUser.id,
		token: hash(token),
		expiresAt: oneHourLater,
	});
	await tokenList.save();
	return { token };
}

export async function logoutUser(token: string): Promise<void> {
	await AppDataSource.getRepository(TokenList)
		.createQueryBuilder()
		.delete()
		.where({ token: hash(token) })
		.execute();
}
