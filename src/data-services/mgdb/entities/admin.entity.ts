import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('admins')
export class AdminEntity extends BaseEntity {
  @Column()
  username: string;

  @Column()
  fullname: string;

  @Column()
  email: string;

  @Column()
  password: string;

  toJSON() {
    return {
      ...this,
      password: undefined,
    };
  }
}
