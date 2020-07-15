"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryRunnerFactory = exports.QueryRunnerTransaction = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
class QueryRunnerTransaction {
    constructor(queryRunner) {
        this.queryRunner = queryRunner;
        this.destroyed = false;
    }
    beginTransaction() {
        if (!this.queryRunner.isTransactionActive) {
            return this.queryRunner.startTransaction();
        }
    }
    commit() {
        return this.queryRunner.commitTransaction();
    }
    rollback() {
        return this.queryRunner.rollbackTransaction();
    }
    release() {
        this.destroyed = true;
        return this.queryRunner.release();
    }
    get manager() {
        return this.queryRunner.manager;
    }
}
exports.QueryRunnerTransaction = QueryRunnerTransaction;
let QueryRunnerFactory = class QueryRunnerFactory {
    constructor(connection) {
        this.connection = connection;
    }
    createRunnerAndBeginTransaction() {
        return __awaiter(this, void 0, void 0, function* () {
            const queryRunner = this.connection.createQueryRunner();
            yield queryRunner.connect();
            yield queryRunner.startTransaction();
            return new QueryRunnerTransaction(queryRunner);
        });
    }
};
QueryRunnerFactory = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [typeorm_1.Connection])
], QueryRunnerFactory);
exports.QueryRunnerFactory = QueryRunnerFactory;
