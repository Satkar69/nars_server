import { Module } from '@nestjs/common';
import { AmbulanceUseCaseModule } from 'src/use-cases/ambulance-use-cases/ambulance-use-case.module';
import { AmbulanceController } from './ambulance.controller';

@Module({
  imports: [AmbulanceUseCaseModule],
  controllers: [AmbulanceController],
})
export class AmbulanceControllerModule {}
