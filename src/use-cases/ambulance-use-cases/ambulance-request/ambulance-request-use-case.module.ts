import { Module } from '@nestjs/common';
import { AmbulanceRequestUseCaseService } from './ambulance-request-use-case.service';

@Module({
  providers: [AmbulanceRequestUseCaseService],
  exports: [AmbulanceRequestUseCaseService],
})
export class AmbulanceRequestUseCaseModule {}
