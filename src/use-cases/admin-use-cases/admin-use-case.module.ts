import { Module } from '@nestjs/common';
import { CryptoModule } from 'src/libs/crypto/crypto.module';
import { AdminUseCaseService } from './admin-use-case.service';
import { AdminAuthUseCaseModule } from './admin-auth/admin-auth-use-case.module';
import { AdminAmbulanceUseCaseModule } from './admin-ambulance/admin-ambulance-use-case.module';
import { AdminAmbulanceRequestUseCaseModule } from './admin-ambulance-request/admin-ambulance-request-use-case.module';

@Module({
  imports: [
    CryptoModule,
    AdminAuthUseCaseModule,
    AdminAmbulanceUseCaseModule,
    AdminAmbulanceRequestUseCaseModule,
  ],
  providers: [AdminUseCaseService],
  exports: [
    AdminUseCaseService,
    AdminAuthUseCaseModule,
    AdminAmbulanceUseCaseModule,
    AdminAmbulanceRequestUseCaseModule,
  ],
})
export class AdminUseCaseModule {}
