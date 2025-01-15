import { Module } from '@nestjs/common';
import { AmbulanceUseCaseService } from './ambulance-use-case.service';
import { AmbulanceAuthUseCaseModule } from './ambulance-auth/ambulance-auth-use-case.module';
import { AmbulanceRequestUseCaseModule } from './ambulance-request/ambulance-request-use-case.module';

@Module({
  imports: [AmbulanceAuthUseCaseModule, AmbulanceRequestUseCaseModule],
  providers: [AmbulanceUseCaseService],
  exports: [
    AmbulanceUseCaseService,
    AmbulanceAuthUseCaseModule,
    AmbulanceRequestUseCaseModule,
  ],
})
export class AmbulanceUseCaseModule {}
