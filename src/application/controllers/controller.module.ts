import { Module } from '@nestjs/common';
import { AdminControllerModule, AuthControllerModule } from './';
import { FileUploadControllerModule } from './file-upload/file-upload.module';
@Module({
  imports: [AdminControllerModule, AuthControllerModule, FileUploadControllerModule],
  exports: [AdminControllerModule, AuthControllerModule, FileUploadControllerModule],
})
export class ControllerModule {}
