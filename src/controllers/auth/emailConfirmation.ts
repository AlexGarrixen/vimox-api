import { Request, Response, NextFunction } from 'express';
import { User } from '../../models/user';
import { createToken, createRefreshToken } from '../../utils/jwt';

interface RequestBody {
  emailToken?: string;
}

export const emailConfirmation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { emailToken }: RequestBody = req.body;
    const [user] = await User.find({ emailToken }).select({
      emailToken: 0,
      password: 0,
    });

    if (!user) return res.status(500).json({ message: 'Token no valid' });

    await User.findByIdAndUpdate(user._id, {
      emailToken: null,
      verified: true,
    });

    const tokenPayload = {
      email: user.email,
      userId: user._id,
    };
    const token = await createToken(tokenPayload);
    const refreshToken = await createRefreshToken(tokenPayload);

    res.status(200).json({ token, refreshToken, user });
  } catch (e) {
    next(e);
  }
};
