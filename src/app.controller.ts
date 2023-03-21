import { Controller, Get } from '@nestjs/common';
import { InjectStorage } from 'libs/storage/src/decorator';
import { StorageDriver } from 'libs/storage/src/interface/storageDriver.interface';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectStorage('STORAGE_CONFIG') private readonly testServie: StorageDriver,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
