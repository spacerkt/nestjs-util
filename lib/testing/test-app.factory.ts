import { INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import { TestLogger } from './test.logger';

/**
 * instanciate app for testing
 * make use of [[TestLogger]]
 */
export function createTestApp(moduleFixture: TestingModule): INestApplication {
  const app = moduleFixture.createNestApplication();
  app.useLogger(new TestLogger());
  return app;
}
