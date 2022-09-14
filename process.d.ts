declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_URL: string;
    GITHUB_ID: string;
    GITHUB_SECRET: string;
    NEXTAUTH_URL: string;
    NEXTAUTH_SECRET: string;
    AWS_ACCESSKEY_ID: string;
    AWS_ACCESSKEY_TOKEN: string;
    AWS_S3_REGION: string;
    AWS_S3_BUCKET: string;
    NEXT_PUBLIC_OUTPUTSTANDALONE: string
  }
}
