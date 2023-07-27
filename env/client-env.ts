import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const clientEnv = createEnv({
  client: {
    NEXT_PUBLIC_OUTPUTSTANDALONE: z.string().optional(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_OUTPUTSTANDALONE: process.env.NEXT_PUBLIC_OUTPUTSTANDALONE,
  }
});