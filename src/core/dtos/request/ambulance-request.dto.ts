import { AmbulanceRequestEmergencyStatusEnum } from 'src/common/enums/ambulance-request-condition.enum';
import { AmbulanceRequestStatusEnum } from 'src/common/enums/ambulance-request-status.enum';
import { GeoDataInterface } from 'src/common/interface/geodata.interface';

export class CreateAmbulanceRequestDto {
  ambulance: string;
  emergency_status: AmbulanceRequestEmergencyStatusEnum;
  emergency_description: string;
  hospital_location: GeoDataInterface;
  status: AmbulanceRequestStatusEnum;
}

export class EditAmbulanceRequestDto {
  emergency_status: AmbulanceRequestEmergencyStatusEnum;
  emergency_description: string;
  hospital_location?: GeoDataInterface;
  status?: AmbulanceRequestStatusEnum;
}
