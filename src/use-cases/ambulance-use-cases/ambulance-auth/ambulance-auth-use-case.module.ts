import { Module } from '@nestjs/common';
import { AmbulanceAuthUseCaseService } from './ambulance-auth-use-case.service';
import { CryptoModule } from 'src/libs/crypto/crypto.module';
import { TokenModule } from 'src/libs/token/token.module';

@Module({
  imports: [CryptoModule, TokenModule],
  providers: [AmbulanceAuthUseCaseService],
  exports: [AmbulanceAuthUseCaseService],
})
export class AmbulanceAuthUseCaseModule {}
