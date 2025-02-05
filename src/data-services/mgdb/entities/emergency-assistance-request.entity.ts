import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ObjectId } from 'mongodb';
import { GeoDataInterface } from 'src/common/interface/geodata.interface';

@Entity('emergency_assistance_requests')
export class EmergencyAssistanceRequestEntity extends BaseEntity {
  @Column()
  ambulance: ObjectId;

  @Column()
  requester: ObjectId;

  @Column()
  ambulance_location: {
    latitude: string;
    longitude: string;
  };

  @Column()
  requester_location: {
    latitude: string;
    longitude: string;
  };

  @Column()
  status: string;
}
