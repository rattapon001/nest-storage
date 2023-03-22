import { ConfigurableModuleBuilder } from '@nestjs/common';
import {
  DiskOptions,
  StorageOptions,
} from '../interface/StorageOptions.interface';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN, OPTIONS_TYPE } =
  new ConfigurableModuleBuilder<StorageOptions>()
    .setExtras(
      {
        isGlobal: true,
      },
      (definition, extras) => ({
        ...definition,
        global: extras.isGlobal,
      }),
    )
    .build();
