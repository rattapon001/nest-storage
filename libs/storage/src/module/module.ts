import { DynamicModule, Module, Provider } from '@nestjs/common';
import {
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
    console.log(super.register(options));
    return {
      ...super.register(options),
    };
  }
}
