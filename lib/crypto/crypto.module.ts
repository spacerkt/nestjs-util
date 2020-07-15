import { Module } from '@nestjs/common';
import { CryptoService } from './crypto.service';
import { Sha256 } from './providers/sha256';

@Module({
  providers: [CryptoService, Sha256],
  exports: [CryptoService],
})
export class CryptoModule {}
