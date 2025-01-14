import { Module } from '@nestjs/common';
import { AdminAmbulanceUseCaseService } from './admin-ambulance-use-case.service';

@Module({
  providers: [AdminAmbulanceUseCaseService],
  exports: [AdminAmbulanceUseCaseService],
})
export class AdminAmbulanceUseCaseModule {}
