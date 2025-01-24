import { Controller, Body, Get, Post, Req, Param } from '@nestjs/common';
import { CoreApiResponse } from 'src/application/api/core-api-response';
import { Public } from 'src/application/decorators/public.decorator';
import { AmbulanceUseCaseService } from 'src/use-cases/ambulance-use-cases/ambulance-use-case.service';

@Controller()
export class AmbulanceController {
  constructor(private ambulanceUseCaseService: AmbulanceUseCaseService) {}

  @Public()
  @Get('/get-all')
  async getAll() {
    return CoreApiResponse.success(
      await this.ambulanceUseCaseService.findAllAmbulance(),
    );
  }

  @Public()
  @Get('/get/:id')
  async getOne(@Param('id') ambulanceId: string) {
    return CoreApiResponse.success(
      await this.ambulanceUseCaseService.findAmbulanceById(ambulanceId),
    );
  }

  @Get('/me')
  async getMe(@Req() req: any) {
    return CoreApiResponse.success({ ambulance: req.ambulance });
  }
}
