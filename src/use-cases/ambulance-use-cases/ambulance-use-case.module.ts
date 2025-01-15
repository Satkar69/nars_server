import { Module } from '@nestjs/common';
import { AmbulanceUseCaseService } from './ambulance-use-case.service';
import { AmbulanceAuthUseCaseModule } from './ambulance-auth/ambulance-auth-use-case.module';

@Module({
  imports: [AmbulanceAuthUseCaseModule],
  providers: [AmbulanceUseCaseService],
  exports: [AmbulanceUseCaseService, AmbulanceAuthUseCaseModule],
})
export class AmbulanceUseCaseModule {}
