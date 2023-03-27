import { FileContent } from './fileContent.interface';

export interface StorageDriver {
  /**
   * Put object to the specified key name.
   *
   * @param objectName
   * @param file
   */
  putObject(objectName: string, file: FileContent): Promise<string>;

  /**
   * Put object from the file path to the specified key name.
   *
   * @param objectName
   * @param filePath
   */

  fputObject(objectName: string, filePath: string): Promise<string>;

  /**
   * get signed url
   *
   * @param objectName
   * @param expireIn
   */
  signedUrl(objectName: string, expireIn: number): Promise<string>;
}
