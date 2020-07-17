import {
  ConflictException,
  InternalServerErrorException,
  Logger,
  BadRequestException,
  ContextType,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

import { typeOrmCodeErrors } from '../constants/typeorm-util.constants';

enum Errors {
  INTERNAL = 'Error',
  CONFLICT = 'Conflict',
  BADREQUEST = 'BadRequest',
}

type ErrFunc = (err: any, ctx?: ContextType) => Error;

export class TypeOrmExceptionFilter {
  private static readonly logger = new Logger();
  private static readonly filter: Record<string, ErrFunc> = {
    [typeOrmCodeErrors.uniqueConstraint]: (
      err: any,
      ctx?: ContextType,
    ): Error => {
      const { detail } = err;
      const key = detail.substring(
        detail.indexOf('(') + 1,
        detail.indexOf(')'),
      );
      return TypeOrmExceptionFilter.exceptionByCtx[ctx](
        Errors.CONFLICT,
        `ALREADY_EXISTS ${key}`,
      );
    },
    [typeOrmCodeErrors.notNull]: (err: any, ctx?: ContextType): Error => {
      return TypeOrmExceptionFilter.exceptionByCtx[ctx](
        Errors.BADREQUEST,
        err.message,
      );
    },
  };

  private static readonly exceptionByCtx: Record<
    string,
    (type: Errors, msg: string) => Error
  > = {
    rpc(type: Errors, msg: string) {
      return new RpcException(`${type}: ${msg}`);
    },
    http(type: Errors, msg: string) {
      switch (type) {
        case Errors.CONFLICT:
          return new ConflictException(msg);
        case Errors.BADREQUEST:
          return new BadRequestException(msg);
        case Errors.INTERNAL:
          return new InternalServerErrorException(msg);
      }
    },
  };

  constructor(err: any, scope?: string, ctx?: ContextType) {
    if (!err.code) {
      throw err;
    }
    const errFunc = TypeOrmExceptionFilter.filter[err.code];
    if (!errFunc) {
      TypeOrmExceptionFilter.logger.error(
        err,
        scope ?? 'TypeOrmExceptionFilter',
      );
      switch (ctx) {
        case 'rpc':
          throw new RpcException('Error: INTERNAL');
        default:
          throw new InternalServerErrorException();
      }
    }
    throw errFunc(err, ctx);
  }
}

