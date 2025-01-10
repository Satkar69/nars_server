import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ObjectId } from 'mongodb';
import { AmbulanceRequestStatusEnum } from 'src/common/enums/ambulance-request-status.enum';

@Entity('ambulance-requests')
export class AmbulanceRequestEntity extends BaseEntity {
  @Column()
  ambulance: ObjectId;

  @Column()
  requester: ObjectId;

  @Column()
  ambulance_number: string;

  @Column()
  hospital_location: {
    latitude: string;
    longitude: string;
  };

  @Column()
  status: AmbulanceRequestStatusEnum;

  toJSON() {
    return {
      ...this,
      password: undefined,
    };
  }
}
