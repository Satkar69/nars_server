import { Module } from '@nestjs/common';
import { UserAmbulanceRequestUseCaseService } from './user-ambulance-request.service';

@Module({
  providers: [UserAmbulanceRequestUseCaseService],
  exports: [UserAmbulanceRequestUseCaseService],
})
export class UserAmbulanceRequestModule {}
