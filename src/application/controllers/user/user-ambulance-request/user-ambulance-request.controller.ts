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
import { CoreApiResponse } from 'src/application/api/core-api-response';
import {
  CreateAmbulanceRequestDto,
  EditAmbulanceRequestDto,
} from 'src/core/dtos/request/ambulance-request.dto';
import { UserAmbulanceRequestUseCaseService } from 'src/use-cases/user-use-cases/user-ambulance-request/user-ambulance-request.service';

@Controller('/ambulance-request')
export class UserAmbulanceRequestController {
  constructor(
    private userAmbulanceRequestUseCaseService: UserAmbulanceRequestUseCaseService,
  ) {}

  @Get('/my-request')
  async getMyRequest(@Req() req: any) {
    return CoreApiResponse.success(
      await this.userAmbulanceRequestUseCaseService.findMyAmbulanceRequest(
        req.user._id,
      ),
    );
  }

  @Post('/create')
  async createRequest(@Req() req: any, @Body() dto: CreateAmbulanceRequestDto) {
    return CoreApiResponse.success(
      await this.userAmbulanceRequestUseCaseService.createAmbulanceRequest(
        req.user._id,
        dto,
      ),
    );
  }

  @Patch('/update/:id')
  async updateRequest(
    @Param('id') ambulanceRequestId: string,
    @Body() dto: EditAmbulanceRequestDto,
  ) {
    return CoreApiResponse.success(
      await this.userAmbulanceRequestUseCaseService.updateAmbulanceRequest(
        ambulanceRequestId,
        dto,
      ),
    );
  }

  @Delete('/delete/:id')
  async deleteRequest(@Param('id') ambulanceRequestId: string) {
    return CoreApiResponse.success(
      await this.userAmbulanceRequestUseCaseService.deleteAmbulanceRequest(
        ambulanceRequestId,
      ),
    );
  }
}
