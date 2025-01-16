import { Module } from '@nestjs/common';
import { AdminUseCaseModule } from 'src/use-cases/admin-use-cases/admin-use-case.module';
import { AdminController } from './admin.controller';
import { AdminAmbulanceController } from './admin-ambulance/admin-ambulance.controller';
import { AdminAmbulanceRequestController } from './admin-ambulance-request/admin-ambulance-request.controller';
import { UserUseCaseModule } from 'src/use-cases/user-use-cases/user-use-case.module';
import { AdminUserController } from './admin-user/admin-user.controller';

@Module({
  imports: [AdminUseCaseModule, UserUseCaseModule],
  controllers: [
    AdminController,
    AdminAmbulanceController,
    AdminAmbulanceRequestController,
    AdminUserController,
  ],
})
export class AdminControllerModule {}
