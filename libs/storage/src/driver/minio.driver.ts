import * as Minio from 'minio';
import { FileContent } from '../interface/fileContent.interface';
import { StorageDriver } from '../interface/storageDriver.interface';
import { MinioOptions } from '../interface/StorageOptions.interface';
import { failOrError } from '../utils/handle-error';

export class MinioDriver implements StorageDriver {
  private minioClient: Minio.Client;
  private bucket: string;
  constructor(config: MinioOptions) {
    this.minioClient = new Minio.Client({
      endPoint: config.endPoint,
      port: config.port,
      useSSL: config.useSSL,
      accessKey: config.accessKey,
      secretKey: config.secretKey,
      region: config.region,
    });
    this.bucket = config.bucket;
    this.checkBuckets(config.bucket);
  }

  private async checkBuckets(bucket: string) {
    try {
      const buckets: Minio.BucketItemFromList[] =
        await this.minioClient.listBuckets();
      if (!buckets.some((val) => val.name === bucket)) {
        await this.minioClient.makeBucket(bucket);
      }
    } catch (error) {
      failOrError('on minio driver checkBuckets', error);
    }
  }

  public async putObject(
    objectName: string,
    file: FileContent,
  ): Promise<string> {
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
      failOrError('on minio driver putObject', error);
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
      failOrError('on minio driver fputObject', error);
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
      failOrError('on minio driver signedUrl', error);
    }
  }
}
