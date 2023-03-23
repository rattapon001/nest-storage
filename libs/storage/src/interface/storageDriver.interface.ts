import { FileContent } from './fileContent.interface';

export interface StorageDriver {
  putObject(objectName: string, file: FileContent): any;
  fputObject(objectName: string, file: FileContent, filePath: string): any;
  getObject(path: string): any;
  signedUrl(objectName: string, expireIn: number): Promise<string>;
}
