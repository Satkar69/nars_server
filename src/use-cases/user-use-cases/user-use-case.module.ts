import { Module } from '@nestjs/common';
import { CryptoModule } from 'src/libs/crypto/crypto.module';
import { UserUseCaseService } from './user-use-case.service';
import { UserAuthUseCaseModule } from './user-auth/user-auth-use-case.module';

@Module({
  imports: [CryptoModule, UserAuthUseCaseModule],
  providers: [UserUseCaseService],
  exports: [UserUseCaseService, UserAuthUseCaseModule],
})
export class UserUseCaseModule {}
