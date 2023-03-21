import * as Minio from 'minio';
import { StorageDriver } from '../interface/storageDriver.interface';
import { DiskOptions } from '../interface/StorageOptions.interface';

export class MinioDriver implements StorageDriver {
  private minioClient: Minio.Client;
  constructor(config: DiskOptions) {
    this.minioClient = new Minio.Client({
      endPoint: config.endPoint,
      port: config.port,
      useSSL: config.useSSL,
      accessKey: config.accessKey,
      secretKey: config.secretKey,
      region: config.region,
    });
  }
  putObject(objectName: string, file: any, bucket?: string): any {}
  fputObject(
    objectName: string,
    file: any,
    filePath: string,
    bucket?: string,
  ): any {}
  getObject(path: string, bucket?: string): any {}
  signedUrl(path: string, expireIn: number, bucket?: string): any {}
}
