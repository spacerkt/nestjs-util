import { Connection, QueryRunner, EntityManager } from 'typeorm';
export declare class QueryRunnerTransaction {
    private readonly queryRunner;
    destroyed: boolean;
    constructor(queryRunner: QueryRunner);
    beginTransaction(): Promise<void>;
    commit(): Promise<void>;
    rollback(): Promise<void>;
    release(): Promise<void>;
    get manager(): EntityManager;
}
export declare class QueryRunnerFactory {
    private readonly connection;
    constructor(connection: Connection);
    createRunnerAndBeginTransaction(): Promise<QueryRunnerTransaction>;
}
