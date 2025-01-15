import { Module } from '@nestjs/common';
import { AdminUseCaseModule } from 'src/use-cases/admin-use-cases/admin-use-case.module';
import { AdminController } from './admin.controller';
import { AdminAmbulanceController } from './admin-ambulance/admin-ambulance.controller';

@Module({
  imports: [AdminUseCaseModule],
  controllers: [AdminController, AdminAmbulanceController],
})
export class AdminControllerModule {}
