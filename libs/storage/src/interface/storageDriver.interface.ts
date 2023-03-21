export interface StorageDriver {
  putObject(objectName: string, file: any, bucket?: string): any;
  fputObject(
    objectName: string,
    file: any,
    filePath: string,
    bucket?: string,
  ): any;
  getObject(path: string, bucket?: string): any;
  signedUrl(path: string, expireIn: number, bucket?: string): any;
}
