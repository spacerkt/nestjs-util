import { Injectable } from '@nestjs/common';
import { Sha256 } from './providers/sha256';

@Injectable()
export class CryptoService {
  constructor(readonly sha256: Sha256) {}
}
