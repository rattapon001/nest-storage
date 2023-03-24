import { FileContent } from '../interface/fileContent.interface';
import { StorageDriver } from '../interface/storageDriver.interface';
import { S3Options } from '../interface/StorageOptions.interface';
import {
  S3Client,
  ListBucketsCommand,
  CreateBucketCommand,
  Bucket,
  PutObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { failOrError } from '../utils/handle-error';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export class S3Driver implements StorageDriver {
  private s3Client: S3Client;
  private bucket: string;
  private region: string;
  constructor(config: S3Options) {
    this.bucket = config.bucket;
    this.region = config.region;
    const s3AwsConfig: { [key: string]: any } = {};
    s3AwsConfig['region'] = config.region;
    if (config.accessKeyId && config.secretAccessKey) {
      s3AwsConfig['credentials'] = {
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
      };
    }
    this.s3Client = new S3Client(s3AwsConfig);
    this.checkBuckets(config.bucket);
  }

  private async ListBuckets(): Promise<Bucket[]> {
    try {
      const input = {};
      const command = new ListBucketsCommand(input);
      const response = await this.s3Client.send(command);
      const buckets = response.Buckets;
      return buckets;
    } catch (error) {
      failOrError('on s3 driver ListBuckets', error);
    }
  }

  private async createBuckets(bucketName: string): Promise<string> {
    try {
      const input = {
        Bucket: bucketName,
        CreateBucketConfiguration: {
          LocationConstraint: this.region,
        },
      };
      const command = new CreateBucketCommand(input);
      const response = await this.s3Client.send(command);
      return response.Location;
    } catch (error) {
      failOrError('on s3 driver createBuckets', error);
    }
  }

  private async checkBuckets(bucket: string) {
    try {
      const listBuckets = await this.ListBuckets();
      if (!listBuckets.some((val) => val.Name === bucket)) {
        await this.createBuckets(bucket);
      }
    } catch (error) {
      failOrError('on s3 driver checkBuckets', error);
    }
  }

  public async putObject(
    objectName: string,
    file: FileContent,
  ): Promise<string> {
    try {
      const input = {
        Body: file.buffer,
        Bucket: this.bucket,
        Key: objectName,
        ContentType: file.mimetype,
      };
      const command = new PutObjectCommand(input);
      await this.s3Client.send(command);
      return objectName;
    } catch (error) {
      failOrError('on s3 driver putObject', error);
    }
  }

  public async fputObject(
    objectName: string,
    filePath: string,
  ): Promise<string> {
    return '';
  }

  public async signedUrl(
    objectName: string,
    expireIn: number,
  ): Promise<string> {
    try {
      const command = new GetObjectCommand({
        Bucket: this.bucket,
        Key: objectName,
      });
      const url = await getSignedUrl(this.s3Client, command, {
        expiresIn: expireIn,
      });
      return url;
    } catch (error) {
      failOrError('on s3 driver signedUrl', error);
    }
  }
}
