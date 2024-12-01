import { z } from 'zod';

export enum NODE_ENV {
  DEVELOPMENT = 'development',
  STAGE = 'stage',
  PRODUCTION = 'production',
}

export const envSchema = z.object({
  PORT: z.string().optional().default('3000'),
  NODE_ENV: z.nativeEnum(NODE_ENV).optional().default(NODE_ENV.DEVELOPMENT),
  DATABASE_URL: z.string(),
});
export type Env = z.infer<typeof envSchema>;
