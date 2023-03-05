import {
  GetObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { Readable } from "stream";
import { TurboObjectStorage } from "../storage";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { defaultS3Config, S3StorageOptions } from './config';

const minioconfig = {
  endpoint: {
    protocol: "http:",
    hostname: "127.0.0.1",
    port: 9000,
    path: "/",
  },
  forcePathStyle: true,
};

const minioSignConfig = {
  endpoint: {
    protocol: "http:",
    hostname: "127.0.0.1:9000",
    path: "/",
  },
  forcePathStyle: true,
};



export class MinioStorage implements TurboObjectStorage {
  public client: S3Client;
  public signClient: S3Client;
  public options: S3StorageOptions
  constructor(options?: S3StorageOptions) {
    this.options = Object.assign(defaultS3Config, minioconfig, options)
    this.client = new S3Client(Object.assign(defaultS3Config, minioconfig, options));
    this.signClient = new S3Client(Object.assign(defaultS3Config, minioSignConfig, options));
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
    });
    return uploads3.done();
  }
  async signedUploadUrl(path: string): Promise<any> {
    const command = new PutObjectCommand({
      Key: path,
      Bucket: this.options.bucket,
    });
    return getSignedUrl(this.signClient, command, { expiresIn: 3600 });
  }
  async download(path: string): Promise<string> {
    const command = new GetObjectCommand({
      Key: path,
      Bucket: this.options.bucket,
    });
    return getSignedUrl(this.signClient, command, { expiresIn: 3600 });
  }
  async list(path: string) {
    const command = new ListObjectsV2Command({
      Prefix: path,
      Bucket: this.options.bucket,
    });

    return this.client.send(command).then((output) => output.Contents);
  }
}

const minio = new MinioStorage();

export { minio };