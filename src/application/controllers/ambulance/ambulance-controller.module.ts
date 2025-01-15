import { Module } from '@nestjs/common';
import { AmbulanceUseCaseModule } from 'src/use-cases/ambulance-use-cases/ambulance-use-case.module';
import { AmbulanceController } from './ambulance.controller';
import { AmbulanceRequestController } from './ambulance-request/ambulance-request.controller';

@Module({
  imports: [AmbulanceUseCaseModule],
  controllers: [AmbulanceController, AmbulanceRequestController],
})
export class AmbulanceControllerModule {}
