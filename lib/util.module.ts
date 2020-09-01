import { Module, DynamicModule } from '@nestjs/common';
import { TypeOrmUtilModule } from './typeorm/typeorm-util.module';
import { UtilModuleOptions, UtilAsyncModuleOptions } from './interfaces';

@Module({
  imports: [TypeOrmUtilModule],
  exports: [TypeOrmUtilModule],
})
export class UtilModule {
  static forRoot(options?: UtilModuleOptions): DynamicModule {
    return {
      module: UtilModule,
      global: options?.isGlobal,
      imports: [TypeOrmUtilModule],
      exports: [TypeOrmUtilModule],
    };
  }

  static forRootAsync(options?: UtilAsyncModuleOptions): DynamicModule {
    return {
      module: UtilModule,
      global: options?.isGlobal,
      imports: [TypeOrmUtilModule],
      exports: [TypeOrmUtilModule],
    };
  }
}

