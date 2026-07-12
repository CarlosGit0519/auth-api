const port = Number(process.env.PORT ?? 3000);
const mongoDbUri = process.env.MONGODB_URI;

if (!mongoDbUri) {
  throw new Error('MONGODB_URI must be defined.');
}

export const env = {
  port,
  mongoDbUri,
};
