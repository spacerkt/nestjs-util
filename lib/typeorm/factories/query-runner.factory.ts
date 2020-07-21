import { Connection, QueryRunner, EntityManager } from 'typeorm';
import { Injectable } from '@nestjs/common';

export class QueryRunnerTransaction {
  /*
   * Indicates either connection was closed or not
   */
  destroyed = false;
  constructor(private readonly queryRunner: QueryRunner) {}

  beginTransaction(): Promise<void> {
    if (!this.queryRunner.isTransactionActive) {
      return this.queryRunner.startTransaction();
    }
  }

  commit(): Promise<void> {
    return this.queryRunner.commitTransaction();
  }

  rollback(): Promise<void> {
    return this.queryRunner.rollbackTransaction();
  }

  release(): Promise<void> {
    this.destroyed = true;
    return this.queryRunner.release();
  }

  get manager(): EntityManager {
    return this.queryRunner.manager;
  }
}

@Injectable()
export class QueryRunnerFactory {
  constructor(private readonly connection: Connection) {}

  async createRunnerAndBeginTransaction(): Promise<QueryRunnerTransaction> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    return new QueryRunnerTransaction(queryRunner);
  }
}

