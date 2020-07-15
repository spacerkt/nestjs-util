import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createHash, createCipheriv, createDecipheriv } from 'crypto';
import { bufferSha256Length } from '../crypto.constants';

@Injectable()
export class Sha256 {
  private readonly resizedIV = Buffer.allocUnsafe(bufferSha256Length);
  constructor(private readonly configService: ConfigService) {
    const iv = createHash('sha256')
      .update(this.configService.get<string>('SHA256_IV') || 'constante-api')
      .digest();
    iv.copy(this.resizedIV);
  }

  encrypt(phrase: string): string {
    const cipher = createCipheriv(
      'aes256',
      this.configService.get<string>('APP_KEY'),
      this.resizedIV,
    );
    return cipher.update(phrase, 'binary', 'hex') + cipher.final('hex');
  }

  decrypt(phrase: string): string {
    const decipher = createDecipheriv(
      'aes256',
      this.configService.get<string>('APP_KEY'),
      this.resizedIV,
    );
    return decipher.update(phrase, 'hex', 'binary') + decipher.final('binary');
  }
}
