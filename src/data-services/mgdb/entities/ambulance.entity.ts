import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';
import { AmbulanceStatusEnum } from 'src/common/enums/ambulance-status.enum';

@Entity('ambulance')
export class AmbulanceEntity extends BaseEntity {
  @Column()
  driver_name: string;

  @Column({ unique: true })
  ambulance_number: string;

  @Column({ unique: true })
  contact: string;

  @Column()
  password: string;

  @Column()
  location: {
    latitude: string;
    longitude: string;
  };

  @Column()
  status: AmbulanceStatusEnum;

  toJSON() {
    return {
      ...this,
      password: undefined,
    };
  }
}
