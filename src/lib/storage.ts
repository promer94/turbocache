import { Readable } from "stream";

export interface TurboObjectStorage {
  upload(path: string, file: Readable): Promise<any>;
  download(path: string): Promise<string>;
}
