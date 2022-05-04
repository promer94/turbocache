import {
  S3Client,
  CreateBucketCommand,
} from "@aws-sdk/client-s3";

const region = process.env.AWS_S3_REGION
const keyId = process.env.AWS_ACCESSKEY_ID
const key = process.env.AWS_ACCESSKEY_TOKEN
const bucket = process.env.AWS_S3_BUCKET

const defaultOption = {
  region,
  credentials: {
    secretAccessKey: key,
    accessKeyId: keyId,
  },
  bucket,
  /** https://github.com/aws/aws-sdk-js-v3/issues/1941#issuecomment-824194714 */
  endpoint: "http://127.0.0.1:9000/",
  forcePathStyle: true,
}

const createS3Client = (option = defaultOption) => new S3Client(option);
async function main() {
  const client = createS3Client(defaultOption)
  const commend = new CreateBucketCommand({
    Bucket: defaultOption.bucket,
  })
  const result = await client.send(commend)
  console.log('result', result)
}

main()