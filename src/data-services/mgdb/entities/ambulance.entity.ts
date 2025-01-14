import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';
import { AmbulanceStatusEnum } from 'src/common/enums/ambulance-status.enum';

@Entity('ambulance')
export class AmbulanceEntity extends BaseEntity {
  @Column()
  driver_name: string;

  @Column()
  ambulance_number: string;

  @Column()
  contact: string;

  @Column()
  location: {
    latitude: string;
    longitude: string;
  };

  @Column()
  status: AmbulanceStatusEnum;
}
