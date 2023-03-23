import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileContent } from '../libs/storage/src/interface/fileContent.interface';
import { StorageService } from '../libs/storage/src/module/service';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly storageService: StorageService,
  ) {}

  async onModuleInit() {
    console.log('OnModuleInit');
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  public async upload(@UploadedFile() file: FileContent) {
    return this.storageService
      .getDriver('public')
      .putObject('Test/' + file.originalname, file);
  }
}
