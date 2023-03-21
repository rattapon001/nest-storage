import { Module } from '@nestjs/common';
import { StorageModule } from 'libs/storage/src/module/module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    StorageModule.register({
      disks: {
        user: {
          driver: 'local',
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
