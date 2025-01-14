import { Controller, Body, Post } from '@nestjs/common';
import { CoreApiResponse } from 'src/application/api/core-api-response';
import { UserSignInDto } from 'src/core/dtos/request/signin.dto';
import { UserAuthUseCaseService } from 'src/use-cases/user-use-cases/user-auth/user-auth-use-case.service';

@Controller('/user')
export class UserAuthController {
  constructor(private userAuthUsecaseService: UserAuthUseCaseService) {}

  @Post('/signin')
  async userSignIn(@Body() dto: UserSignInDto) {
    return CoreApiResponse.success(
      await this.userAuthUsecaseService.signIn(dto),
      200,
      'user signin successful',
    );
  }
}
