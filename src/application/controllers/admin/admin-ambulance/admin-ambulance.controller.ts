import {
  Controller,
  Body,
  Get,
  Post,
  Req,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AdminAmbulanceUseCaseService } from 'src/use-cases/admin-use-cases/admin-ambulance/admin-ambulance-use-case.service';
import {
  CreateAmbulanceDto,
  EditAmbulanceDto,
} from 'src/core/dtos/request/ambulance.dto';
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

  @Patch('/update/:id')
  async updateAmbulance(
    @Param('id') ambulanceId: string,
    @Body() dto: EditAmbulanceDto,
  ) {
    return CoreApiResponse.success(
      await this.adminAmbulanceUseCaseService.updateAmbulance(ambulanceId, dto),
    );
  }

  @Delete('/delete/:id')
  async deleteAmbulance(@Param('id') ambulanceId: string) {
    return CoreApiResponse.success(
      await this.adminAmbulanceUseCaseService.deleteAmbulance(ambulanceId),
    );
  }
}
