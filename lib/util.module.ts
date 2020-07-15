import { Module, Global } from '@nestjs/common';
import { CryptoModule } from './crypto/crypto.module';
import { TypeOrmUtilModule } from './typeorm/typeorm-util.module';

@Global()
@Module({
  imports: [CryptoModule, TypeOrmUtilModule],
  exports: [CryptoModule, TypeOrmUtilModule],
})
export class UtilModule {}
