import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column()
  fullname: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  contact: string;

  @Column()
  password: string;

  @Column()
  location: {
    latitude: string;
    longitude: string;
  };

  toJSON() {
    return {
      ...this,
      password: undefined,
    };
  }
}
