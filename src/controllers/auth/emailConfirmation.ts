import { Request, Response, NextFunction } from 'express';
import Boom from '@hapi/boom';
import { User } from '../../models/user';

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

    if (!user) return next(Boom.unauthorized('Token invalid'));

    await User.findByIdAndUpdate(user._id, {
      emailToken: null,
      verified: true,
    });

    res.status(200).json({ message: 'successful verification' });
  } catch (e) {
    next(e);
  }
};
