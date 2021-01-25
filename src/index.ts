import 'reflect-metadata';

import { bootstrapServer } from '@server/server';

bootstrapServer()
    .then(() => console.info('Server initialized! 🚀'))
    .catch((error) => console.error(error));
