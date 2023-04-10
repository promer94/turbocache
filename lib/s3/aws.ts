import {
  GetObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'
import { Readable } from 'stream'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { defaultS3Config, S3StorageOptions } from './config'

export class S3Storage {
  public client: S3Client
  public options: S3StorageOptions
  constructor(options?: S3StorageOptions) {
    const clientOptions = Object.assign({}, defaultS3Config, options)
    this.options = clientOptions
    this.client = new S3Client(this.options)
  }
  async upload(path: string, file: Readable): Promise<any> {
    const uploads3 = new Upload({
      client: this.client,
      queueSize: 5,
      params: {
        Body: file,
        Key: path,
        Bucket: this.options.bucket,
      },
    })
    return uploads3.done()
  }
  async signedUploadUrl(path: string): Promise<any> {
    const command = new PutObjectCommand({
      Key: path,
      Bucket: this.options.bucket,
    })
    return getSignedUrl(this.client, command, { expiresIn: 3600 })
  }
  async download(path: string): Promise<string> {
    const command = new GetObjectCommand({
      Key: path,
      Bucket: this.options.bucket,
    })
    // @ts-ignore
    return getSignedUrl(this.client, command, { expiresIn: 3600 })
  }
  async list(path: string) {
    const command = new ListObjectsV2Command({
      Prefix: path,
      Bucket: this.options.bucket,
    })

    return this.client.send(command).then((output) => output.Contents)
  }
}

const S3 = new S3Storage()

export { S3 }
