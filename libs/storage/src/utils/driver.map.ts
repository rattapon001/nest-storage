import { MinioDriver } from '../driver/minio.driver';

export const driverMap = new Map<string, any>([['minio', MinioDriver]]);
