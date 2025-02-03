import { Controller, Get } from '@nestjs/common';
import { CoreApiResponse } from 'src/application/api/core-api-response';
import { Public } from 'src/application/decorators/public.decorator';
const hospitalData = require('../../../data/hospital-data.json');

@Public()
@Controller()
export class HospitalController {
  constructor() {}

  @Get('/get-all')
  async getAllHospital() {
    return CoreApiResponse.success(hospitalData);
  }
}
