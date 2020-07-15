"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOrmExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const typeorm_util_constants_1 = require("../constants/typeorm-util.constants");
class TypeOrmExceptionFilter {
    constructor(err, context) {
        this.err = err;
        this.filter = {
            [typeorm_util_constants_1.typeOrmCodeErrors.uniqueConstraint]: (err) => {
                const { detail } = err;
                const key = detail.substring(detail.indexOf('(') + 1, detail.indexOf(')'));
                return new common_1.ConflictException(`${key} already exists`);
            },
            [typeorm_util_constants_1.typeOrmCodeErrors.notNull]: (err) => {
                return new common_1.BadRequestException(err.message);
            },
        };
        if (!err.code) {
            throw err;
        }
        const errFunc = this.filter[err.code];
        if (!errFunc) {
            new common_1.Logger(context || 'TypeOrmExceptionFilter').error(err);
            throw new common_1.InternalServerErrorException();
        }
        throw errFunc(err);
    }
}
exports.TypeOrmExceptionFilter = TypeOrmExceptionFilter;
