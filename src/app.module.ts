import { Module } from '@nestjs/common';
import { StorageModule } from '../libs/storage/src';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    StorageModule.register({
      isGlobal: true,
      disks: {
        public: {
          driver: 'minio',
          bucket: 'public',
          region: 'ap-southeast-2',
          accessKey: 'minioadmin',
          secretKey: 'minioadmin',
          useSSL: false,
          endPoint: '192.168.2.133',
          port: 9000,
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
