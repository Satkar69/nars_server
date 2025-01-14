import { Module } from '@nestjs/common';
import { CryptoModule } from 'src/libs/crypto/crypto.module';
import { AdminUseCaseService } from './admin-use-case.service';
import { AdminAuthUseCaseModule } from './admin-auth/admin-auth-use-case.module';
import { AdminAmbulanceUseCaseModule } from './admin-ambulance/admin-ambulance-use-case.module';

@Module({
  imports: [CryptoModule, AdminAuthUseCaseModule, AdminAmbulanceUseCaseModule],
  providers: [AdminUseCaseService],
  exports: [
    AdminUseCaseService,
    AdminAuthUseCaseModule,
    AdminAmbulanceUseCaseModule,
  ],
})
export class AdminUseCaseModule {}
