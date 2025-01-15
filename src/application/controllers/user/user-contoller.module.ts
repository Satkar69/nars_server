import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserUseCaseModule } from 'src/use-cases/user-use-cases/user-use-case.module';
import { UserAmbulanceRequestController } from './user-ambulance-request/user-ambulance-request.controller';

@Module({
  imports: [UserUseCaseModule],
  controllers: [UserController, UserAmbulanceRequestController],
})
export class UserControllerModule {}
