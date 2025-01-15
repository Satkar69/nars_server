import { Controller, Body, Get, Post, Req } from '@nestjs/common';
import { AdminAmbulanceUseCaseService } from 'src/use-cases/admin-use-cases/admin-ambulance/admin-ambulance-use-case.service';
import { CreateAmbulanceDto } from 'src/core/dtos/request/ambulance.dto';
import { CoreApiResponse } from 'src/application/api/core-api-response';

@Controller('/ambulance')
export class AdminAmbulanceController {
  constructor(
    private adminAmbulanceUseCaseService: AdminAmbulanceUseCaseService,
  ) {}

  @Post('/create')
  async createAmbulance(@Body() dto: CreateAmbulanceDto) {
    0;
    return CoreApiResponse.success(
      await this.adminAmbulanceUseCaseService.createAmbulance(dto),
      201,
      'ambulance created successfully',
    );
  }
}
