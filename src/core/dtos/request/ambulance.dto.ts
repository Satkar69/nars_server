import { AmbulanceStatusEnum } from 'src/common/enums/ambulance-status.enum';
import { GeoDataInterface } from 'src/common/interface/geodata.interface';

export class CreateAmbulanceDto {
  driver_name: string;
  ambulance_numnber: String;
  contact: string;
  password: string;
  location: GeoDataInterface;
  status: AmbulanceStatusEnum;
}

export class EditAmbulanceDto {
  driver_name?: string;
  ambulance_numnber?: String;
  contact?: string;
  password?: string;
  location?: GeoDataInterface;
  status?: AmbulanceStatusEnum;
}
