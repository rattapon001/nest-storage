import { FileContent } from './fileContent.interface';

export interface StorageDriver {
  putObject(objectName: string, file: FileContent): Promise<string>;
  fputObject(objectName: string, filePath: string): Promise<string>;
  signedUrl(objectName: string, expireIn: number): Promise<string>;
}
