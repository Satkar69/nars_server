import { Controller, Body, Get, Post, Req, Patch } from '@nestjs/common';
import { UserSignUpDto } from 'src/core/dtos/request/signup.dto';
import { CoreApiResponse } from 'src/application/api/core-api-response';
import { UserUseCaseService } from 'src/use-cases/user-use-cases/user-use-case.service';
import { EditUserDto } from 'src/core/dtos/request/user.dto';

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

  @Get('/me')
  async getMe(@Req() req: any) {
    return CoreApiResponse.success({ user: req.user });
  }

  @Patch('/update')
  async updatePersonalDetail(@Req() req: any, @Body() dto: EditUserDto) {
    return CoreApiResponse.success(
      await this.userUseCaseService.editPersonalDetail(req.user._id, dto),
    );
  }
}
