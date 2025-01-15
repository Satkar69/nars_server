import { Controller, Body, Get, Post, Req, Param } from '@nestjs/common';
import { CoreApiResponse } from 'src/application/api/core-api-response';
import { AdminAmbulanceRequestUseCaseService } from 'src/use-cases/admin-use-cases/admin-ambulance-request/admin-ambulance-request-use-case.service';

@Controller('/ambulance-request')
export class AdminAmbulanceRequestController {
  constructor(
    private adminAmbulanceRequestUseCaseService: AdminAmbulanceRequestUseCaseService,
  ) {}

  @Get('get-all')
  async getAll() {
    return CoreApiResponse.success(
      await this.adminAmbulanceRequestUseCaseService.findAllAmbulanceRequests(),
    );
  }

  @Get('get/:id')
  async getOne(@Param('id') ambulanceRequestId: string) {
    return CoreApiResponse.success(
      await this.adminAmbulanceRequestUseCaseService.findAmbulanceRequestById(
        ambulanceRequestId,
      ),
    );
  }
}
