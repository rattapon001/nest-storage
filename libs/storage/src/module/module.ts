import { DynamicModule, Module, Provider } from '@nestjs/common';
import { StorageOptions } from '../interface/StorageOptions.interface';

@Module({
  providers: [],
  exports: [],
})
export class StorageModule {
  constructor() {}
  static register(options: StorageOptions): DynamicModule {
    console.log(
      '🚀 ~ file: module.ts:10 ~ StorageModule ~ register ~ options:',
      options,
    );
    const storageProvider: Provider = {
      provide: '_STORAGE_TEST',
      useClass: class Test {},
    };
    return {
      global: true,
      module: StorageModule,
      providers: [storageProvider],
      exports: [storageProvider],
    };
  }
}
