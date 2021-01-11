import { Connection, QueryRunner, EntityManager } from 'typeorm';
import { Injectable } from '@nestjs/common';

/**
 * Represent a db transaction
 */
export class QueryRunnerTransaction {
  /**
   * Indicates either connection was closed or not
   */
  destroyed = false;
  constructor(private readonly queryRunner: QueryRunner) {}

  async beginTransaction(): Promise<void> {
    if (this.queryRunner.isTransactionActive) {
      return;
    }
    return this.queryRunner.startTransaction();
  }

  async commit(): Promise<void> {
    if (this.destroyed) {
      return;
    }
    await this.queryRunner.commitTransaction();
  }

  async rollback(): Promise<void> {
    if (this.destroyed) {
      return;
    }
    await this.queryRunner.rollbackTransaction();
  }

  /**
   * release transaction, must be called after rollback/commit
   */
  release(): Promise<void> {
    this.destroyed = true;
    return this.queryRunner.release();
  }

  get manager(): EntityManager {
    return this.queryRunner.manager;
  }
}

/**
 * Create a [[QueryRunnerTransaction]]
 */
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
