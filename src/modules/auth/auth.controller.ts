import bcrypt from 'bcrypt';
import type { Request, Response } from 'express';

import { AppError } from '../../errors/app-error';
import { UserModel } from '../users/user.model';
import { registerSchema } from './auth.validation';

export async function register(request: Request, response: Response): Promise<void> {
  const input = registerSchema.parse(request.body);

  const userWithSameEmail = await UserModel.exists({ email: input.email });

  if (userWithSameEmail) {
    throw new AppError(409, 'Email is already registered.');
  }

  const passwordHash = await bcrypt.hash(input.password, 12);
  const user = await UserModel.create({
    name: input.name,
    email: input.email,
    password: passwordHash,
  });

  response.status(201).json({
    data: {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
    },
  });
}
