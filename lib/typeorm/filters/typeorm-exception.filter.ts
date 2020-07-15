import {
  ConflictException,
  InternalServerErrorException,
  Logger,
  BadRequestException,
} from '@nestjs/common';

import { typeOrmCodeErrors } from '../constants/typeorm-util.constants';

export class TypeOrmExceptionFilter {
  private filter: Record<string, (err: any) => Error> = {
    [typeOrmCodeErrors.uniqueConstraint]: (err: any): Error => {
      const { detail } = err;
      const key = detail.substring(
        detail.indexOf('(') + 1,
        detail.indexOf(')'),
      );
      return new ConflictException(`${key} already exists`);
    },
    [typeOrmCodeErrors.notNull]: (err: any): Error => {
      return new BadRequestException(err.message);
    },
  };

  constructor(readonly err: any, context?: string) {
    if (!err.code) {
      throw err;
    }
    const errFunc = this.filter[err.code];
    if (!errFunc) {
      new Logger(context || 'TypeOrmExceptionFilter').error(err);
      throw new InternalServerErrorException();
    }
    throw errFunc(err);
  }
}
