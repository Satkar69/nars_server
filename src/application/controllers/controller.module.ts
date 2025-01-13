import { Module } from '@nestjs/common';
import { AuthControllerModule } from './auth/auth-controller.module';
import { AdminControllerModule } from './admin/admin-controller.module';
import { UserControllerModule } from './user/user-contoller.module';

@Module({
  imports: [AuthControllerModule, AdminControllerModule, UserControllerModule],
  exports: [AuthControllerModule, AdminControllerModule, UserControllerModule],
})
export class ControllerModule {}
