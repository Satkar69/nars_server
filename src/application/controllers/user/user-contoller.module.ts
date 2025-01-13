import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserUseCaseModule } from 'src/use-cases/user-use-cases/user-use-case.module';

@Module({
  imports: [UserUseCaseModule],
  controllers: [UserController],
})
export class UserControllerModule {}
