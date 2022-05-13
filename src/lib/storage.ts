import { Readable } from "stream";

export interface TurboObjectStorage {
  upload(path: string, file: Readable): Promise<any>;
  download(path: string): Promise<string>;
  signedUploadUrl(path: string): Promise<string>;
  list(path: string): Promise<any[] | undefined>;
}
