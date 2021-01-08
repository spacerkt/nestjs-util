import { INestApplication, Logger } from '@nestjs/common';
import { Connection } from 'typeorm';
import { loadFixtures } from '../utils';

export async function initTestDatabase(
  app: INestApplication,
  path: string,
  logger?: Logger,
): Promise<Connection | undefined> {
  if (process.env.NODE_ENV !== 'test') {
    return undefined;
  }
  const connection = app.get<Connection>(Connection);
  if (!connection) {
    return undefined;
  }
  await connection.synchronize(true);
  const result = await loadFixtures(path, connection);
  if (logger) {
    logger.log(`Fixtures: ${JSON.stringify(result)}`);
  }
  return connection;
}
