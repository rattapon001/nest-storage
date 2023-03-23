import * as Minio from 'minio';
import { FileContent } from '../interface/fileContent.interface';
import { StorageDriver } from '../interface/storageDriver.interface';
import { DiskOptions } from '../interface/StorageOptions.interface';
import { failedOrError } from '../utils/handle-error';

export class MinioDriver implements StorageDriver {
  private minioClient: Minio.Client;
  private bucket: string;
  constructor(config: DiskOptions) {
    this.minioClient = new Minio.Client({
      endPoint: config.endPoint,
      port: config.port,
      useSSL: config.useSSL,
      accessKey: config.accessKey,
      secretKey: config.secretKey,
      region: config.region,
    });
    this.bucket = config.bucket;
  }

  async putObject(objectName: string, file: FileContent): Promise<string> {
    try {
      const metaData = {
        'Content-Type': file.mimetype,
      };
      await this.minioClient.putObject(
        this.bucket,
        objectName,
        file.buffer,
        metaData,
      );
      return objectName;
    } catch (error) {
      failedOrError('on minio driver putObject', error);
    }
  }
  public async fputObject(
    objectName: string,
    filePath: string,
  ): Promise<string> {
    try {
      await this.minioClient.fPutObject(this.bucket, objectName, filePath);
      return objectName;
    } catch (error) {
      failedOrError('on minio driver fputObject', error);
    }
  }

  public async signedUrl(
    objectName: string,
    expireIn: number,
  ): Promise<string> {
    try {
      const url = await this.minioClient.presignedUrl(
        'GET',
        this.bucket,
        objectName,
        expireIn,
      );
      return url;
    } catch (error) {
      failedOrError('on minio driver signedUrl', error);
    }
  }
}
