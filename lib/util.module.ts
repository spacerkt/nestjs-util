import { Module, DynamicModule } from '@nestjs/common';
import { CryptoModule } from './crypto/crypto.module';
import { TypeOrmUtilModule } from './typeorm/typeorm-util.module';
import { UtilModuleOptions, UtilAsyncModuleOptions } from './interfaces';

@Module({
  imports: [CryptoModule, TypeOrmUtilModule],
  exports: [CryptoModule, TypeOrmUtilModule],
})
export class UtilModule {
  static forRoot(options: UtilModuleOptions): DynamicModule {
    return {
      module: UtilModule,
      global: options.isGlobal,
      imports: [CryptoModule, TypeOrmUtilModule],
      exports: [CryptoModule, TypeOrmUtilModule],
    };
  }

  static forRootAsync(options: UtilAsyncModuleOptions): DynamicModule {
    return {
      module: UtilModule,
      global: options.isGlobal,
      imports: [CryptoModule, TypeOrmUtilModule],
      exports: [CryptoModule, TypeOrmUtilModule],
    };
  }
}

