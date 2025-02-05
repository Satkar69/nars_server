import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import AppNotFoundException from 'src/application/exception/app-not-found.exception';
import { convertToObjectId } from 'src/common/helpers/convert-to-object-id';
import { AmbulanceEntity } from 'src/data-services/mgdb/entities/ambulance.entity';
import { MongoRepository } from 'typeorm';

// TODO :: real time ambulance location data logic

@Injectable()
export class AmbulanceUseCaseService {
  constructor(
    @InjectRepository(AmbulanceEntity)
    private ambulanceRepository: MongoRepository<AmbulanceEntity>,
  ) {}

  async findAllAmbulance() {
    return await this.ambulanceRepository.find({ where: { deletedAt: null } });
  }

  async findAmbulanceById(ambulanceId: string) {
    const ambulance = await this.ambulanceRepository.findOneBy({
      _id: convertToObjectId(ambulanceId),
    });

    if (!ambulance) throw new AppNotFoundException('ambulance does not exits');

    return ambulance;
  }
}
