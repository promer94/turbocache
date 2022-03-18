export interface ObjectStorage {
  upload(path: string, file: NodeJS.ReadableStream): Promise<any>;
  download(path: string): Promise<string>;
}

