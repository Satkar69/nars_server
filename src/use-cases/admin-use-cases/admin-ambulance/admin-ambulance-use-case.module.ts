import { Module } from '@nestjs/common';
import { AdminAmbulanceUseCaseService } from './admin-ambulance-use-case.service';
import { CryptoModule } from 'src/libs/crypto/crypto.module';

@Module({
  providers: [CryptoModule, AdminAmbulanceUseCaseService],
  exports: [AdminAmbulanceUseCaseService],
})
export class AdminAmbulanceUseCaseModule {}
