import { Module } from '@nestjs/common';
import { CryptoModule } from 'src/libs/crypto/crypto.module';
import { UserUseCaseService } from './user-use-case.service';
import { UserAuthUseCaseModule } from './user-auth/user-auth-use-case.module';
import { UserAmbulanceRequestModule } from './user-ambulance-request/user-ambulance-request.module';

@Module({
  imports: [CryptoModule, UserAuthUseCaseModule, UserAmbulanceRequestModule],
  providers: [UserUseCaseService],
  exports: [
    UserUseCaseService,
    UserAuthUseCaseModule,
    UserAmbulanceRequestModule,
  ],
})
export class UserUseCaseModule {}
