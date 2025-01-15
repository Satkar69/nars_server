import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { convertToObjectId } from 'src/common/helpers/convert-to-object-id';
import { AmbulanceRequestEntity } from 'src/data-services/mgdb/entities/ambulance-request.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdminAmbulanceRequestUseCaseService {
  constructor(
    @InjectRepository(AmbulanceRequestEntity)
    private ambulanceRequestRepository: Repository<AmbulanceRequestEntity>,
  ) {}

  async findAllAmbulanceRequests() {
    return await this.ambulanceRequestRepository.find({
      where: { deletedAt: null },
    });
  }

  async findAmbulanceRequestById(ambulanceRequestId: string) {
    return await this.ambulanceRequestRepository.findOneBy({
      _id: convertToObjectId(ambulanceRequestId),
    });
  }
}
