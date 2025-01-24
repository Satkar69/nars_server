import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { convertToObjectId } from 'src/common/helpers/convert-to-object-id';
import { AmbulanceEntity } from 'src/data-services/mgdb/entities/ambulance.entity';
import { Repository } from 'typeorm';

// TODO :: real time ambulance location data logic

@Injectable()
export class AmbulanceUseCaseService {
  constructor(
    @InjectRepository(AmbulanceEntity)
    private ambulanceRepository: Repository<AmbulanceEntity>,
  ) {}

  async findAllAmbulance() {
    return await this.ambulanceRepository.find();
  }

  async findAmbulanceById(ambulanceId: string) {
    const ambulance = await this.ambulanceRepository.findOneBy({
      _id: convertToObjectId(ambulanceId),
    });

    if (!ambulance) throw new NotFoundException('ambulance does not exits');

    return ambulance;
  }
}
