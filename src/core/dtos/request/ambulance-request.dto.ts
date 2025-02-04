import { AmbulanceRequestEmergencyStatusEnum } from 'src/common/enums/ambulance-request-condition.enum';
import { AmbulanceRequestStatusEnum } from 'src/common/enums/ambulance-request-status.enum';
import { GeoDataInterface } from 'src/common/interface/geodata.interface';

export class CreateAmbulanceRequestDto {
  ambulance: string;
  hospital_location: GeoDataInterface;
  status: AmbulanceRequestStatusEnum;
}

export class EditAmbulanceRequestDto {
  hospital_location?: GeoDataInterface;
  status?: AmbulanceRequestStatusEnum;
}
