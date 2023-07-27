import { serverEnv } from '~/env/server-env'

const region = serverEnv.AWS_S3_REGION
const keyId = serverEnv.AWS_ACCESSKEY_ID
const key = serverEnv.AWS_ACCESSKEY_TOKEN
const bucket = serverEnv.AWS_S3_BUCKET
const endpoint = serverEnv.AWS_S3_ENDPOINT

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
