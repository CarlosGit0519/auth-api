import bcrypt from 'bcrypt';
import type { Request, Response } from 'express';
import jwt, { type SignOptions } from 'jsonwebtoken';

import { env } from '../../config/env';
import { AppError } from '../../errors/app-error';
import { UserModel } from '../users/user.model';
import { loginSchema, registerSchema } from './auth.validation';

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

export async function login(request: Request, response: Response): Promise<void> {
  const input = loginSchema.parse(request.body);
  const user = await UserModel.findOne({ email: input.email }).select('+password');

  if (!user) {
    throw new AppError(401, 'Invalid email or password.');
  }

  const passwordMatches = await bcrypt.compare(input.password, user.password);

  if (!passwordMatches) {
    throw new AppError(401, 'Invalid email or password.');
  }

  const signOptions: SignOptions = {
    expiresIn: env.jwtExpiresIn as NonNullable<SignOptions['expiresIn']>,
  };
  const accessToken = jwt.sign({ sub: user.id }, env.jwtSecret, signOptions);

  response.status(200).json({
    data: {
      accessToken,
      tokenType: 'Bearer',
    },
  });
}
