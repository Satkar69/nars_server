import { Module } from '@nestjs/common';
import { AdminAmbulanceUseCaseService } from './admin-ambulance-use-case.service';
import { CryptoModule } from 'src/libs/crypto/crypto.module';

@Module({
  imports: [CryptoModule],
  providers: [AdminAmbulanceUseCaseService],
  exports: [AdminAmbulanceUseCaseService],
})
export class AdminAmbulanceUseCaseModule {}
