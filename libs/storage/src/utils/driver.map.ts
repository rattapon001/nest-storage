import { MinioDriver } from '../driver/minio.driver';
import { S3Driver } from '../driver/s3.driver';

export const driverMap = new Map<string, any>([
  ['minio', MinioDriver],
  ['s3', S3Driver],
]);
