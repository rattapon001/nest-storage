import { Controller, Get } from '@nestjs/common';
import { InjectStorage } from 'libs/storage/src/decorator';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectStorage('TEST') private readonly testServie: any,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
