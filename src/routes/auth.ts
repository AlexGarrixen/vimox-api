import { Route } from '../types';
import { signUp } from '../controllers/auth/signup';
import { login } from '../controllers/auth/login';
import { emailConfirmation } from '../controllers/auth/emailConfirmation';
import { renewToken } from '../controllers/auth/renewToken';
import { forgotPassword } from '../controllers/auth/forgotPassword';
import { resetPassword } from '../controllers/auth/reset-password';
import {
  schemeSignup,
  schemeEmailConfirmation,
  schemeForgotPassword,
  schemeResetPassword,
} from '../utils/validationSchemes/auth';
import { validateScheme } from '../middlewares';

export const auth: Route[] = [
  {
    path: '/auth/signup',
    method: 'post',
    handlers: [validateScheme(schemeSignup), signUp],
  },
  {
    path: '/auth/login',
    method: 'post',
    handlers: [login],
  },
  {
    path: '/auth/email-confirmation',
    method: 'post',
    handlers: [
      validateScheme(schemeEmailConfirmation, 'body'),
      emailConfirmation,
    ],
  },
  {
    path: '/auth/renew-token',
    method: 'post',
    handlers: [renewToken],
  },
  {
    path: '/auth/forgot-password',
    method: 'post',
    handlers: [validateScheme(schemeForgotPassword), forgotPassword],
  },
  {
    path: '/auth/reset-password',
    method: 'put',
    handlers: [validateScheme(schemeResetPassword), resetPassword],
  },
];
