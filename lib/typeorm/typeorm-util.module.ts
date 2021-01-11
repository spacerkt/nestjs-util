import { Module } from '@nestjs/common';
import { QueryRunnerFactory } from './factories/query-runner.factory';

/**
 * TypeOrmUtilModule
 * provide [[QueryRunnerFactory]] which creates a [[QueryRunnerTransaction]]
 */
@Module({
  providers: [QueryRunnerFactory],
  exports: [QueryRunnerFactory],
})
export class TypeOrmUtilModule {}
