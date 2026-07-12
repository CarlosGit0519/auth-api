import { Router } from 'express';

import { requireAuth } from '../../middlewares/require-auth';
import { getCurrentUser, login, register } from './auth.controller';

export const authRouter = Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.get('/me', requireAuth, getCurrentUser);
