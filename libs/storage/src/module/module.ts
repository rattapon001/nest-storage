import { DynamicModule, Module, Provider } from '@nestjs/common';
import { StorageOptions } from '../interface/StorageOptions.interface';
import { STORAGE_CONFIG } from '../utils/storage.config';
import { StorageService } from './service';

@Module({
  providers: [],
  exports: [],
})
export class StorageModule {
  constructor() {}
  public static register(options: StorageOptions): DynamicModule {
    // console.log(
    //   '🚀 ~ file: module.ts:10 ~ StorageModule ~ register ~ options:',
    //   options,
    // );
    const storageProvider: Provider = {
      provide: STORAGE_CONFIG,
      useClass: class Test {},
    };
    return {
      global: true,
      module: StorageModule,
      providers: [
        {
          provide: STORAGE_CONFIG,
          useValue: options,
        },
        StorageService,
      ],
      exports: [storageProvider],
    };
  }
}
