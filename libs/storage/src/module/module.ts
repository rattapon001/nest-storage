import { DynamicModule, Module, Provider } from '@nestjs/common';
import {
  ASYNC_OPTIONS_TYPE,
  ConfigurableModuleClass,
  OPTIONS_TYPE,
} from '../utils/storage.module-definition';
import { StorageService } from './service';

@Module({
  providers: [StorageService],
  exports: [StorageService],
})
export class StorageModule extends ConfigurableModuleClass {
  static register(options: typeof OPTIONS_TYPE): DynamicModule {
    return {
      ...super.register(options),
    };
  }

  static registerAsync(options: typeof ASYNC_OPTIONS_TYPE): DynamicModule {
    return {
      ...super.registerAsync(options),
    };
  }
}
