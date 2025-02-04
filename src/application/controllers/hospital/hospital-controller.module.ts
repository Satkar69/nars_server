import { Module } from '@nestjs/common';
import { HospitalController } from './hospital.contoller';

@Module({
  controllers: [HospitalController],
})
export class HospitalControllerModule {}
