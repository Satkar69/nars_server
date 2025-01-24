import { Controller, Body, Get, Post, Req, Param, Patch } from '@nestjs/common';
import { CoreApiResponse } from 'src/application/api/core-api-response';
import { EditAmbulanceRequestDto } from 'src/core/dtos/request/ambulance-request.dto';
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

  @Patch('/action/:id')
  async requestAction(
    @Param('id') ambulanceRequestId: string,
    @Body() dto: EditAmbulanceRequestDto,
  ) {
    return CoreApiResponse.success(
      await this.ambulanceRequestUseCaseService.ambulanceRequestAction(
        ambulanceRequestId,
        dto,
      ),
    );
  }
}
