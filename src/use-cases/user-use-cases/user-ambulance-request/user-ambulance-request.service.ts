import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { AmbulanceRequestEntity } from 'src/data-services/mgdb/entities/ambulance-request.entity';
import { AmbulanceEntity } from 'src/data-services/mgdb/entities/ambulance.entity';
import { UserEntity } from 'src/data-services/mgdb/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserAmbulanceRequestUseCaseService {
  constructor(
    @InjectRepository(AmbulanceRequestEntity)
    private ambulanceRequestRepository: Repository<AmbulanceRequestEntity>,

    @InjectRepository(AmbulanceEntity)
    private ambulanceReposiroty: Repository<AmbulanceEntity>,

    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async createAmbulanceRequest(userId: ObjectId) {}
}
