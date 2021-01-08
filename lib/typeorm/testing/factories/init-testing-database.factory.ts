import { INestApplication } from '@nestjs/common';
import { Connection } from 'typeorm';
import { loadFixtures } from '../utils';
import { LoadFixturesResult } from '../../interfaces/load-fixtures-result.interface';

export async function initTestDatabase(
  app: INestApplication,
  path?: string,
): Promise<[Connection | undefined, LoadFixturesResult | undefined]> {
  if (process.env.NODE_ENV !== 'test') {
    return [undefined, undefined];
  }
  const connection = app.get<Connection>(Connection);
  if (!connection) {
    return [undefined, undefined];
  }
  await connection.synchronize(true);
  if (!path) {
    return [connection, { loaded: 0, inserted: 0, updated: 0 }];
  }
  const result = await loadFixtures(path, connection);
  return [connection, result];
}
