import { Controller, Body, Get, Post, Req } from '@nestjs/common';
import { UserSignUpDto } from 'src/core/dtos/request/signup.dto';
import { CoreApiResponse } from 'src/application/api/core-api-response';
import { UserUseCaseService } from 'src/use-cases/user-use-cases/user-use-case.service';

@Controller()
export class UserController {
  constructor(private userUseCaseService: UserUseCaseService) {}

  @Post('/create')
  async signup(@Body() dto: UserSignUpDto) {
    return CoreApiResponse.success(
      await this.userUseCaseService.UserSignUp(dto),
      201,
      'user created successfully',
    );
  }

  @Get('/get-all')
  async getAll() {
    return CoreApiResponse.success(await this.userUseCaseService.findAllUser());
  }

  @Get('/me')
  async getMe(@Req() req: any) {
    return CoreApiResponse.success({ user: req.user });
  }
}
