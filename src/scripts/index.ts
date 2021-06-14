import cliSelect from 'cli-select';
import { createUserAdminOption } from './scriptOptions';

cliSelect({
  values: ['Create user admin', 'Exit'],
  selected: '(*)',
})
  .then((response) => {
    switch (response.id) {
      case 0:
        createUserAdminOption();
        break;
      default:
        process.exit(0);
        break;
    }
  })
  .catch(() => {
    console.log('Cancelled');
  });
