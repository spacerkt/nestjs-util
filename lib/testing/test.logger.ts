import { LoggerService } from '@nestjs/common';

/**
 * Override Logger from nestjs
 * prevent logger to output any data
 */
export class TestLogger implements LoggerService {
  log(message: string) {}
  error(message: string, trace: string) {}
  warn(message: string) {}
  debug(message: string) {}
  verbose(message: string) {}
  setContext(message: string): void {}
  getTimestamp(): string {}
}
