export interface StorageDriver {
  putObject(objectName: string, file: any, bucket: string): any;
  fputObject(
    objectName: string,
    file: any,
    bucket: string,
    filePath: string,
  ): any;
  getObject(path: string, bucket: string): any;
  signedUrl(path: string, bucket: string, expireIn: number): any;
}
