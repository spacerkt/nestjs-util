import { INestApplication } from '@nestjs/common';
import { Connection } from 'typeorm';
import { loadFixtures } from '../utils';

export async function initTestDatabase(
  app: INestApplication,
  path: string,
): Promise<Connection | undefined> {
  if (process.env.NODE_ENV !== 'test') {
    return undefined;
  }
  const connection = app.get<Connection>(Connection);
  if (!connection) {
    return undefined;
  }
  await connection.synchronize(true);
  await loadFixtures(path, connection);
  return connection;
}
