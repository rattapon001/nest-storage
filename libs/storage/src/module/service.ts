import { Inject, Injectable, Logger } from '@nestjs/common';
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
  private logger = new Logger();

  constructor(
    @Inject(MODULE_OPTIONS_TOKEN) private readonly options: StorageOptions,
  ) {
    this.inintDriver(options);
  }

  private inintDriver(options: StorageOptions) {
    const disks = Object.entries(this.options.disks);
    disks.forEach((val) => {
      this.drivers.set(val[0], this.newDriver(val[1]));
      this.logger.log(
        `Storage service create driver ${val[1].driver} on disk ${val[0]} successfully`,
      );
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
