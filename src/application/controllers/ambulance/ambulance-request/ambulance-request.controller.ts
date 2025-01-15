import { Controller, Body, Get, Post, Req, Param } from '@nestjs/common';
import { CoreApiResponse } from 'src/application/api/core-api-response';
import { AmbulanceRequestUseCaseService } from 'src/use-cases/ambulance-use-cases/ambulance-request/ambulance-request-use-case.service';

@Controller('/ambulance-request')
export class AmbulanceRequestController {
  constructor(
    private ambulanceRequestUseCaseService: AmbulanceRequestUseCaseService,
  ) {}

  @Get('/my-requests')
  async getMyRequests(@Req() req: any) {
    return CoreApiResponse.success(
      await this.ambulanceRequestUseCaseService.findMyRequests(
        req.ambulance._id,
      ),
    );
  }
}
