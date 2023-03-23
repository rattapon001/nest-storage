export interface MinioOptions {
  driver: 'minio';
  endPoint: string;
  region?: string;
  bucket?: string;
  accessKey: string;
  secretKey: string;
  useSSL: boolean;
  port: number;
}

export interface S3Options {
  driver: 's3';
  region: string;
  bucket: string;
  accessKeyId?: string;
  secretAccessKey?: string;
}

export interface StorageOptions {
  isGlobal?: boolean;
  disks: Record<string, MinioOptions | S3Options>;
}
