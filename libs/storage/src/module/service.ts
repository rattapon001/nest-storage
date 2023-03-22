import { Inject, Injectable } from '@nestjs/common';
import { StorageOptions } from '../interface/StorageOptions.interface';
import { MODULE_OPTIONS_TOKEN } from '../utils/storage.module-definition';

@Injectable()
export class StorageService {
  constructor(@Inject(MODULE_OPTIONS_TOKEN) private options: StorageOptions) {
    console.log(
      '🚀 ~ file: service.ts:7 ~ StorageService ~ constructor ~ option:',
      options,
    );
  }

  public put() {
    console.log('this function put object');
  }
}
