import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ObjectId } from 'mongodb';

@Entity('emergency_assistance_requests')
export class EmergencyAssistanceRequestEntity extends BaseEntity {
  @Column()
  requester: ObjectId;
}
