import {
  ConflictException,
  InternalServerErrorException,
  Logger,
  BadRequestException,
  ContextType,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

import { typeOrmCodeErrors } from '../constants/typeorm-util.constants';
import { TypeORMError } from '../interfaces/typeorm-error.interface';
import { TypeOrmErrors } from '../enums/typeorm-errors.enum';

type ErrFunc = (err: TypeORMError, ctx?: ContextType) => Error;
type ExFunc = (type: TypeOrmErrors, msg: string) => Error;

export class TypeOrmExceptionFilter {
  private static readonly logger = new Logger();
  private static readonly filterMap: ReadonlyMap<string, ErrFunc> = new Map<
    string,
    ErrFunc
  >([
    [
      typeOrmCodeErrors.uniqueConstraint,
      (err, ctx?): Error => {
        const { detail } = err;
        const key = detail.substring(
          detail.indexOf('(') + 1,
          detail.indexOf(')'),
        );
        return TypeOrmExceptionFilter.exceptionByCtxMap.get(ctx)(
          TypeOrmErrors.CONFLICT,
          `AlreadyExists ${key}`,
        );
      },
    ],
    [
      typeOrmCodeErrors.notNull,
      (err, ctx?): Error => {
        return TypeOrmExceptionFilter.exceptionByCtxMap.get(ctx)(
          TypeOrmErrors.BADREQUEST,
          err.message,
        );
      },
    ],
  ]);

  private static readonly exceptionByCtxMap: ReadonlyMap<
    ContextType,
    ExFunc
  > = new Map<ContextType, ExFunc>([
    [
      'rpc',
      (type: TypeOrmErrors, msg: string) => {
        return new RpcException(`${type}: ${msg}`);
      },
    ],
    [
      'http',
      (type: TypeOrmErrors, msg: string) => {
        switch (type) {
          case TypeOrmErrors.CONFLICT:
            return new ConflictException(msg);
          case TypeOrmErrors.BADREQUEST:
            return new BadRequestException(msg);
          default:
            return new InternalServerErrorException(msg);
        }
      },
    ],
  ]);

  constructor(err: TypeORMError, scope?: string, ctx?: ContextType) {
    if (!err.code) {
      throw err;
    }
    const errFunc = TypeOrmExceptionFilter.filterMap.get(err.code);
    if (!errFunc) {
      TypeOrmExceptionFilter.logger.error(
        err,
        scope ?? 'TypeOrmExceptionFilter',
      );
      throw TypeOrmExceptionFilter.exceptionByCtxMap.get(ctx ?? 'http')(
        TypeOrmErrors.INTERNAL,
        'default',
      );
    }
    throw errFunc(err, ctx);
  }
}
