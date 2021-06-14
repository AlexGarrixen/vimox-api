import prompt from 'prompt';
import chalk from 'chalk';
import { createUserAdmin } from './users';

export const createUserAdminOption = () => {
  prompt.start();
  prompt.get(
    [
      { name: 'username', required: true, type: 'string' },
      {
        name: 'email',
        required: true,
        type: 'string',
        pattern:
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      },
      { name: 'password', required: true, type: 'string' },
    ],
    function (err, result) {
      if (err) process.exit(1);
      else {
        const values = result as {
          email: string;
          username: string;
          password: string;
        };
        console.info(chalk.bgBlueBright('[LOADING...]'));
        createUserAdmin(values)
          .then((response) => {
            console.log(chalk.bgGreenBright('[SUCCESS]'), ': \n', response);
            process.exit(0);
          })
          .catch((reason) => {
            console.log(chalk.redBright('Error:'), reason);
            process.exit(1);
          });
      }
    }
  );
};
