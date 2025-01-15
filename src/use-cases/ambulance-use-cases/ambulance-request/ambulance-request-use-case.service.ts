import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { AmbulanceRequestEntity } from 'src/data-services/mgdb/entities/ambulance-request.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AmbulanceRequestUseCaseService {
  constructor(
    @InjectRepository(AmbulanceRequestEntity)
    private ambulanceRequestRepository: Repository<AmbulanceRequestEntity>,
  ) {}

  async findMyRequests(ambulanceId: ObjectId) {
    const ambulanceRequests = await this.ambulanceRequestRepository.find({
      where: { ambulance: ambulanceId },
    });

    return ambulanceRequests;
  }
}
