import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ObjectId } from 'mongodb';
import { AmbulanceRequestStatusEnum } from 'src/common/enums/ambulance-request-status.enum';
import { AmbulanceRequestEmergencyStatusEnum } from 'src/common/enums/ambulance-request-condition.enum';

@Entity('ambulance-requests')
export class AmbulanceRequestEntity extends BaseEntity {
  @Column()
  ambulance: ObjectId;

  @Column()
  requester: ObjectId;

  @Column()
  emergency_status: AmbulanceRequestEmergencyStatusEnum;

  @Column()
  emergency_description: string;

  @Column()
  hospital_location: {
    latitude: string;
    longitude: string;
  };

  @Column()
  status: AmbulanceRequestStatusEnum;
}
