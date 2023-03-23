import { Inject, Injectable } from '@nestjs/common';
import { StorageDriver } from '../interface/storageDriver.interface';
import {
  DiskOptions,
  StorageOptions,
} from '../interface/StorageOptions.interface';
import { driverMap } from '../utils/driver.map';
import { MODULE_OPTIONS_TOKEN } from '../utils/storage.module-definition';

@Injectable()
export class StorageService {
  private drivers = new Map<string, StorageDriver>();

  constructor(
    @Inject(MODULE_OPTIONS_TOKEN) private readonly options: StorageOptions,
  ) {
    const disks = Object.entries(this.options.disks);
    disks.forEach((val) => {
      this.drivers.set(val[0], this.newDriver(val[1]));
    });
  }

  public getDriver(dist: string): StorageDriver {
    return this.drivers.get(dist);
  }

  private newDriver(option: DiskOptions): StorageDriver {
    const driver = driverMap.get(option.driver);
    return new driver(option);
  }
}
