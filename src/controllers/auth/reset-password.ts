import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import Boom from '@hapi/boom';
import { User } from '../../models/user';
import { verifyResetPasswordToken } from '../../utils/jwt';

export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { resetToken, newPassword } = req.body;
  
  try {
    const token = await verifyResetPasswordToken(resetToken);
    const user = await User.findById(token.userId);

    if (!user) return next(Boom.unauthorized());
    if (user.resetPasswordToken !== resetToken)
      return next(Boom.unauthorized());

    const encryptedPassword = await bcrypt.hash(newPassword, 10);
    await User.findByIdAndUpdate(token.userId, {
      password: encryptedPassword,
      resetPasswordToken: null,
    });

    res.status(200).json({ message: 'contraseña actualizada' });
  } catch (reason) {
    next(reason);
  }
};
