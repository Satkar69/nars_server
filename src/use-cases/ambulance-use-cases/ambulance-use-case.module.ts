import { Module } from '@nestjs/common';
import { AmbulanceUseCaseService } from './ambulance-use-case.service';

Module({
  providers: [AmbulanceUseCaseService],
  exports: [AmbulanceUseCaseService],
});

export class AmbulanceUseCaseModule {}
