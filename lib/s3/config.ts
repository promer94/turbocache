const region = process.env.AWS_S3_REGION
const keyId = process.env.AWS_ACCESSKEY_ID
const key = process.env.AWS_ACCESSKEY_TOKEN
const bucket = process.env.AWS_S3_BUCKET
const endpoint = process.env.AWS_S3_ENDPOINT

export interface S3StorageOptions {
  region: string
  credentials: {
    secretAccessKey: string
    accessKeyId: string
  }
  bucket: string
  endpoint?:
    | string
    | { protocol: string; hostname: string; port: number; path: string }
  forcePathStyle?: boolean
}

const resolveS3Config = () => {
  return {
    region,
    credentials: {
      secretAccessKey: key,
      accessKeyId: keyId,
    },
    bucket,
    ...(endpoint && { endpoint }),
  }
}

export const defaultS3Config = resolveS3Config()
