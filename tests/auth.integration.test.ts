import request from 'supertest';
import { describe, expect, it } from 'vitest';

import { app } from '../src/app';

const validUser = {
  name: 'Carlos Mendes',
  email: 'carlos@example.com',
  password: 'password123',
};

describe('Authentication API', () => {
  it('registers a new user without returning the password', async () => {
    const response = await request(app).post('/api/v1/auth/register').send(validUser);

    expect(response.status).toBe(201);
    expect(response.body.data.user).toMatchObject({
      name: validUser.name,
      email: validUser.email,
    });
    expect(response.body.data.user).not.toHaveProperty('password');
  });

  it('rejects a duplicate email address', async () => {
    await request(app).post('/api/v1/auth/register').send(validUser);
    const response = await request(app).post('/api/v1/auth/register').send(validUser);

    expect(response.status).toBe(409);
    expect(response.body.error.message).toBe('Email is already registered.');
  });

  it('logs in with valid credentials and returns an access token', async () => {
    await request(app).post('/api/v1/auth/register').send(validUser);
    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: validUser.email, password: validUser.password });

    expect(response.status).toBe(200);
    expect(response.body.data.accessToken).toEqual(expect.any(String));
    expect(response.body.data.tokenType).toBe('Bearer');
  });

  it('returns the current user with a valid bearer token', async () => {
    await request(app).post('/api/v1/auth/register').send(validUser);
    const loginResponse = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: validUser.email, password: validUser.password });

    const response = await request(app)
      .get('/api/v1/auth/me')
      .set('Authorization', `Bearer ${loginResponse.body.data.accessToken}`);

    expect(response.status).toBe(200);
    expect(response.body.data.user).toMatchObject({
      name: validUser.name,
      email: validUser.email,
    });
  });
});
