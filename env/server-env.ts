import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const serverEnv = createEnv({
  server: {
    DATABASE_URL: z.string(),
    GITHUB_ID: z.string(),
    GITHUB_SECRET: z.string(),
    NEXTAUTH_URL: z.string().url(),
    NEXTAUTH_SECRET: z.string(),
    AWS_ACCESSKEY_ID: z.string(),
    AWS_ACCESSKEY_TOKEN: z.string(),
    AWS_S3_REGION: z.string(),
    AWS_S3_BUCKET: z.string(),
    AWS_S3_ENDPOINT: z.string(),
    NODE_ENV: z.string(),
    LOG_LEVEL: z.string().optional(),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    GITHUB_ID: process.env.GITHUB_ID,
    GITHUB_SECRET: process.env.GITHUB_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    AWS_ACCESSKEY_ID: process.env.AWS_ACCESSKEY_ID,
    AWS_ACCESSKEY_TOKEN: process.env.AWS_ACCESSKEY_TOKEN,
    AWS_S3_REGION: process.env.AWS_S3_REGION,
    AWS_S3_BUCKET: process.env.AWS_S3_BUCKET,
    AWS_S3_ENDPOINT: process.env.AWS_S3_ENDPOINT,
    NODE_ENV: process.env.NODE_ENV,
    LOG_LEVEL: process.env.LOG_LEVEL,
  }
});