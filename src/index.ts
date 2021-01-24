import 'reflect-metadata';

import { bootstrapServer } from '@server/server';

bootstrapServer()
    .then(() => console.log('Project initialized! 🚀'))
    .catch((error) => console.log(error));
