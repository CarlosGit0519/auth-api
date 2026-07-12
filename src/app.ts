import express from 'express';
import swaggerUi from 'swagger-ui-express';

import { openApiDocument } from './docs/openapi';
import { errorHandler } from './middlewares/error-handler';
import { authRouter } from './modules/auth/auth.routes';

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDocument));

app.get('/health', (_request, response) => {
  return response.status(200).json({ status: 'ok' });
});

app.use('/api/v1/auth', authRouter);

app.use(errorHandler);

export { app };
