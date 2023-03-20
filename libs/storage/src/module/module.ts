import { DynamicModule, Module } from '@nestjs/common';
import { StorageService } from './service';

@Module({
  imports: [],
  controllers: [],
  providers: [],
  exports: [],
})
export class StorageModule {
  constructor() {}
  static register(options: any): DynamicModule {
    return {
      global: true,
      module: StorageModule,
      providers: [],
      exports: [],
    };
  }
}
