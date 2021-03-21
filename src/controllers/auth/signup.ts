import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import { User } from '../../models';
import { createToken, createRefreshToken } from '../../shared/utils/jwt';

interface RequestBody {
	username: string;
	email: string;
	password: string;
}

export const signUp = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { username, email, password }: RequestBody = req.body;
		const registeredUser = await User.find({ email });

		if (registeredUser.length > 0)
			return res
				.status(409)
				.json({ message: 'There is already a user with this account' });

		const encryptedPassword = await bcrypt.hash(password, 10);
		const userDoc = new User({ username, email, password: encryptedPassword });
		const createdUser = await userDoc.save();

		const tokenPayload = { email, userId: createdUser._id };
		const token = await createToken(tokenPayload);
		const refreshToken = await createRefreshToken(tokenPayload);

		res.status(201).json({
			user: {
				id: createdUser._id,
				username,
				email,
			},
			token,
			refreshToken,
		});
	} catch (e) {
		next(e);
	}
};
