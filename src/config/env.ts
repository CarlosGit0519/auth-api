const port = Number(process.env.PORT ?? 3000);
const mongoDbUri = process.env.MONGODB_URI;
const jwtSecret = process.env.JWT_SECRET;
const jwtExpiresIn = process.env.JWT_EXPIRES_IN ?? '1h';

if (!mongoDbUri) {
  throw new Error('MONGODB_URI must be defined.');
}

if (!jwtSecret) {
  throw new Error('JWT_SECRET must be defined.');
}

export const env = {
  port,
  mongoDbUri,
  jwtSecret,
  jwtExpiresIn,
};
