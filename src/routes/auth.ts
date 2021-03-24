import { Route } from '../shared/interfaces';
import { signUp, login, emailConfirmation } from '../controllers';
import { schemeSignup, schemeEmailConfirmation } from '../validationSchemes';
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
];
