import 'dotenv/config';

import { app } from './app';
import { connectDatabase } from './config/database';
import { env } from './config/env';

async function startServer(): Promise<void> {
  await connectDatabase();

  app.listen(env.port, () => {
    console.log(`Server is running on port ${env.port}.`);
  });
}

startServer().catch((error: unknown) => {
  console.error('Unable to start server.', error);
  process.exit(1);
});
