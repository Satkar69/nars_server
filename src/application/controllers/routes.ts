import { Routes } from '@nestjs/core';
import { AdminControllerModule } from './admin/admin-controller.module';
import { AuthControllerModule } from './auth/auth-controller.module';
import { FileUploadControllerModule } from './file-upload/file-upload.module';

const routes: Routes = [
  {
    path: '/pre-ipo',
    children: [
      {
        path: '/admin',
        children: [AdminControllerModule],
      },
      {
        path: '/upload',
        children: [FileUploadControllerModule],
      },
    ],
  },
  {
    path: '/auth',
    children: [AuthControllerModule],
  },
];

export default routes;
