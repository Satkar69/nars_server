import { Controller, Body, Post } from '@nestjs/common';
import { CoreApiResponse } from 'src/application/api/core-api-response';
import { AmbulanceSignInDto } from 'src/core/dtos/request/signin.dto';
import { AmbulanceAuthUseCaseService } from 'src/use-cases/ambulance-use-cases/ambulance-auth/ambulance-auth-use-case.service';

@Controller('/ambulance')
export class AmbulanceAuthController {
  constructor(
    private ambulanceAuthUseCaseService: AmbulanceAuthUseCaseService,
  ) {}
  @Post('/signin')
  async adminSignIn(@Body() dto: AmbulanceSignInDto) {
    return CoreApiResponse.success(
      await this.ambulanceAuthUseCaseService.signIn(dto),
      200,
      'ambulance signin successful',
    );
  }
}
