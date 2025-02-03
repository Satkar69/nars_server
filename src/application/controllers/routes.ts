import { Routes } from '@nestjs/core';
import { AuthControllerModule } from './auth/auth-controller.module';
import { AdminControllerModule } from './admin/admin-controller.module';
import { UserControllerModule } from './user/user-contoller.module';
import { AmbulanceControllerModule } from './ambulance/ambulance-controller.module';
import { HospitalControllerModule } from './hospital/hospital-controller.module';

const routes: Routes = [
  {
    path: '/nars',
    children: [
      {
        path: '/auth',
        children: [AuthControllerModule],
      },
      {
        path: '/admin',
        children: [AdminControllerModule],
      },
      {
        path: '/user',
        children: [UserControllerModule],
      },
      {
        path: '/ambulance',
        children: [AmbulanceControllerModule],
      },
      {
        path: '/hospitals',
        children: [HospitalControllerModule],
      },
    ],
  },
];

export default routes;
