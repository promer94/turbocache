import {
  GetObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { Readable } from "stream";
import { TurboObjectStorage } from "./storage";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Consola } from "consola";
import { logger } from "./logger";

const region = process.env.AWS_S3_REGION;
const keyId = process.env.AWS_ACCESSKEY_ID;
const key = process.env.AWS_ACCESSKEY_TOKEN;
const bucket = process.env.AWS_S3_BUCKET;

/* using minio for development */
const minioconfig =
  process.env.NODE_ENV === "development"
    ? {
        endpoint: {
          protocol: "http",
          hostname: "127.0.0.1",
          port: 9000,
          path: "/",
        },
        forcePathStyle: true,
      }
    : {};


const defaultOption = {
  region,
  credentials: {
    secretAccessKey: key,
    accessKeyId: keyId,
  },
  bucket,
  logger: logger,
  ...minioconfig,
};

const createS3Client = (option = defaultOption) => new S3Client(option);

export class S3Storage implements TurboObjectStorage {
  public client: S3Client;
  public options: {
    region: string;
    credentials: {
      secretAccessKey: string;
      accessKeyId: string;
    };
    bucket: string;
    logger: Consola;
  };
  constructor(options = defaultOption) {
    this.options = options;
    this.client = createS3Client(options);
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
    uploads3.on("httpUploadProgress", (progress) => {
      console.log(progress)
    });
    return uploads3.done();
  }
  async signedUploadUrl(path: string): Promise<any> {
    const command = new PutObjectCommand({
      Key: path,
      Bucket: this.options.bucket,
    });
    return getSignedUrl(this.client, command, { expiresIn: 3600 });
  }
  async download(path: string): Promise<string> {
    const command = new GetObjectCommand({
      Key: path,
      Bucket: this.options.bucket,
    });
    // @ts-ignore
    return getSignedUrl(this.client, command, { expiresIn: 3600 });
  }
  async list(path: string) {
    const command = new ListObjectsV2Command({
      Prefix: path,
      Bucket: this.options.bucket,
    });

    return this.client.send(command).then((output) => output.Contents);
  }
}

const s3Storage = new S3Storage(defaultOption);

export { s3Storage };
