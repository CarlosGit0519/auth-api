import mongoose from 'mongoose';

import { env } from './env';

export async function connectDatabase(): Promise<void> {
  await mongoose.connect(env.mongoDbUri);
  console.log('Connected to MongoDB.');
}
