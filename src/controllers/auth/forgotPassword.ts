import { Request, Response, NextFunction } from 'express';
import Boom from '@hapi/boom';
import { User } from '../../models/user';
import { createResetPasswordToken } from '../../utils/jwt';
import { sgMail, templateResetPassword } from '../../utils/sendgrid';

export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) return next(Boom.unauthorized('Esta cuenta no existe'));

    const token = await createResetPasswordToken({
      userId: user._id,
      email: user.email,
      role: user.role,
    });
    await User.findByIdAndUpdate(user._id, {
      resetPasswordToken: token,
    });
    await sgMail.send({
      to: [email, 'vimox.co@gmail.com'],
      from: {
        name: 'Vimox',
        email: 'vimox.co@gmail.com',
      },
      subject: 'Restablecer mi contraseña de Vimox!',
      text: 'Confirma tu nueva contraseña',
      html: templateResetPassword(token as string),
    });

    res.status(200).json({ message: 'email send' });
  } catch (reason) {
    next(reason);
  }
};
