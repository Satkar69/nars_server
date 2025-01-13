import { Routes } from '@nestjs/core';
import { AuthControllerModule } from './auth/auth-controller.module';
import { AdminControllerModule } from './admin/admin-controller.module';
import { UserControllerModule } from './user/user-contoller.module';

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
    ],
  },
];

export default routes;
