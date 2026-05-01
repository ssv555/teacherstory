import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not defined");
}
const queryClient = postgres(process.env.DATABASE_URL);
import * as schema from './schema';
export const db = drizzle(queryClient, { schema });
