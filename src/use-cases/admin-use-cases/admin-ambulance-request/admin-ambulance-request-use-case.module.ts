import { Module } from '@nestjs/common';
import { AdminAmbulanceRequestUseCaseService } from './admin-ambulance-request-use-case.service';

@Module({
  providers: [AdminAmbulanceRequestUseCaseService],
  exports: [AdminAmbulanceRequestUseCaseService],
})
export class AdminAmbulanceRequestUseCaseModule {}
