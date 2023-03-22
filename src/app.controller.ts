import { Controller, Get } from '@nestjs/common';
import { StorageService } from '../libs/storage/src/module/service';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly s: StorageService,
  ) {}

  async onModuleInit() {
    console.log('OnModuleInit');
    this.s.put();
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
