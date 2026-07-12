import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { env } from '../config/env';
import { AppError } from '../errors/app-error';

export function requireAuth(request: Request, _response: Response, next: NextFunction): void {
  try {
    const authorization = request.headers.authorization;

    if (!authorization?.startsWith('Bearer ')) {
      throw new AppError(401, 'Authentication token is required.');
    }

    const token = authorization.slice('Bearer '.length);
    const payload = jwt.verify(token, env.jwtSecret);

    if (typeof payload === 'string' || !payload.sub) {
      throw new AppError(401, 'Invalid access token.');
    }

    request.auth = { userId: payload.sub };
    next();
  } catch (error: unknown) {
    if (error instanceof AppError) {
      next(error);
      return;
    }

    next(new AppError(401, 'Invalid or expired access token.'));
  }
}
