import { Module } from '@nestjs/common';
import { AuthControllerModule } from './auth/auth-controller.module';
import { AdminControllerModule } from './admin/admin-controller.module';
import { UserControllerModule } from './user/user-contoller.module';
import { AmbulanceControllerModule } from './ambulance/ambulance-controller.module';
import { HospitalControllerModule } from './hospital/hospital-controller.module';

@Module({
  imports: [
    AuthControllerModule,
    AdminControllerModule,
    UserControllerModule,
    AmbulanceControllerModule,
    HospitalControllerModule,
  ],
  exports: [
    AuthControllerModule,
    AdminControllerModule,
    UserControllerModule,
    AmbulanceControllerModule,
    HospitalControllerModule,
  ],
})
export class ControllerModule {}
