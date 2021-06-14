import { Route } from '../types';
import { signUp } from '../controllers/auth/signup';
import { login } from '../controllers/auth/login';
import { adminLogin } from '../controllers/auth/adminLogin';
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
    path: '/signup',
    method: 'post',
    handlers: [validateScheme(schemeSignup), signUp],
  },
  {
    path: '/login',
    method: 'post',
    handlers: [login],
  },
  {
    path: '/login/admin',
    method: 'post',
    handlers: [adminLogin],
  },
  {
    path: '/email-confirmation',
    method: 'post',
    handlers: [
      validateScheme(schemeEmailConfirmation, 'body'),
      emailConfirmation,
    ],
  },
  {
    path: '/renew-token',
    method: 'post',
    handlers: [renewToken],
  },
  {
    path: '/forgot-password',
    method: 'post',
    handlers: [validateScheme(schemeForgotPassword), forgotPassword],
  },
  {
    path: '/reset-password',
    method: 'put',
    handlers: [validateScheme(schemeResetPassword), resetPassword],
  },
];
