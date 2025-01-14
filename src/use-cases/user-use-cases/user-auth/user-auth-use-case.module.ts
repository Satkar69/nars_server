import { Module } from '@nestjs/common';
import { CryptoModule } from 'src/libs/crypto/crypto.module';
import { TokenModule } from 'src/libs/token/token.module';
import { UserAuthUseCaseService } from './user-auth-use-case.service';

@Module({
  imports: [CryptoModule, TokenModule],
  providers: [UserAuthUseCaseService],
  exports: [UserAuthUseCaseService],
})
export class UserAuthUseCaseModule {}
