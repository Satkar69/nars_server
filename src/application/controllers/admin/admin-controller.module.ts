import { Module } from '@nestjs/common';
import { AdminUseCaseModule } from 'src/use-cases/admin-use-cases/admin-use-case.module';
import { AdminController } from './admin.controller';
import { AdminAmbulanceController } from './admin-ambulance/admin-ambulance.controller';
import { AdminAmbulanceRequestController } from './admin-ambulance-request/admin-ambulance-request.controller';

@Module({
  imports: [AdminUseCaseModule],
  controllers: [
    AdminController,
    AdminAmbulanceController,
    AdminAmbulanceRequestController,
  ],
})
export class AdminControllerModule {}
