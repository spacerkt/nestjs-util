import { Module } from '@nestjs/common';
import { QueryRunnerFactory } from './factories/query-runner.factory';

@Module({
  providers: [QueryRunnerFactory],
  exports: [QueryRunnerFactory],
})
export class TypeOrmUtilModule {}
