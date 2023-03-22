export interface DiskOptions {
  driver: 's3' | 'minio';
  endPoint: string;
  region?: string;
  bucket?: string;
  accessKey: string;
  secretKey: string;
  useSSL: boolean;
  port: number;
}

export interface StorageOptions {
  isGlobal?: boolean;
  disks: Record<string, DiskOptions>;
}
