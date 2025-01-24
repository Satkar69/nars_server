import { Controller, Body, Get, Post, Req, Param } from '@nestjs/common';
import { CoreApiResponse } from 'src/application/api/core-api-response';
import { UserUseCaseService } from 'src/use-cases/user-use-cases/user-use-case.service';

@Controller('/user')
export class AdminUserController {
  constructor(private userUseCaseService: UserUseCaseService) {}

  @Get('/get-all')
  async getAll() {
    return CoreApiResponse.success(await this.userUseCaseService.findAllUser());
  }

  @Get('/get/:id')
  async getOne(@Param('id') userId: string) {
    return CoreApiResponse.success(
      await this.userUseCaseService.findUserById(userId),
    );
  }
}
