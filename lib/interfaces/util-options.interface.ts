import { ModuleMetadata } from '@nestjs/common/interfaces';

export interface UtilModuleOptions {
  isGlobal?: boolean;
}

export interface UtilAsyncModuleOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useFactory: (
    ...args: any[]
  ) => UtilModuleOptions | Promise<UtilModuleOptions>;
  inject?: any[];
  isGlobal?: boolean;
}

