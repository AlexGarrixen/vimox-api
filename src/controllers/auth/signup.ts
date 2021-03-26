import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { User } from '../../models/user';
import { sgMail, templateEmailVerification } from '../../utils/sendgrid';

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
    const emailToken = crypto.randomBytes(16).toString('hex');
    const userDoc = new User({
      username,
      email,
      password: encryptedPassword,
      emailToken,
    });
    const createdUser = await userDoc.save();

    await sgMail.send({
      to: email,
      from: 'gxanimejs@gmail.com',
      subject: 'Bienvenido a GxAnime!',
      text: 'Confirma tu Email',
      html: templateEmailVerification(createdUser.emailToken as string),
    });

    res.status(201).json({
      message: 'account created',
    });
  } catch (e) {
    next(e);
  }
};
