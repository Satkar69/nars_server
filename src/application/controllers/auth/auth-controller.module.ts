import { Module } from '@nestjs/common';

import { AdminUseCaseModule } from 'src/use-cases/admin-use-cases/admin-use-case.module';
import { UserUseCaseModule } from 'src/use-cases/user-use-cases/user-use-case.module';
import { AmbulanceUseCaseModule } from 'src/use-cases/ambulance-use-cases/ambulance-use-case.module';

import { AdminAuthController } from './admin-auth-controller';
import { UserAuthController } from './user-auth-controller';
import { AmbulanceAuthController } from './ambulance-auth.controller';

@Module({
  imports: [AdminUseCaseModule, UserUseCaseModule, AmbulanceUseCaseModule],
  controllers: [
    AdminAuthController,
    UserAuthController,
    AmbulanceAuthController,
  ],
})
export class AuthControllerModule {}
