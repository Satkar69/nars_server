import { Routes } from '@nestjs/core';
import { AuthControllerModule } from './auth/auth-controller.module';
import { AdminControllerModule } from './admin/admin-controller.module';


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
    ],
  },
];

export default routes;
