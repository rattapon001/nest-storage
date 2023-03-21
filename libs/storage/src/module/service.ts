import { Inject, Injectable } from '@nestjs/common';
import { STORAGE_CONFIG } from '../utils/storage.config';

@Injectable()
export class StorageService {
  constructor(@Inject(STORAGE_CONFIG) private option: any) {
    console.log(
      '🚀 ~ file: service.ts:7 ~ StorageService ~ constructor ~ option:',
      option,
    );
  }
}
