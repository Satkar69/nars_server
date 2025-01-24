import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { convertToObjectId } from 'src/common/helpers/convert-to-object-id';
import { AmbulanceRequestEntity } from 'src/data-services/mgdb/entities/ambulance-request.entity';
import { AmbulanceEntity } from 'src/data-services/mgdb/entities/ambulance.entity';
import { UserEntity } from 'src/data-services/mgdb/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdminAmbulanceRequestUseCaseService {
  constructor(
    @InjectRepository(AmbulanceRequestEntity)
    private ambulanceRequestRepository: Repository<AmbulanceRequestEntity>,

    @InjectRepository(AmbulanceEntity)
    private ambulanceRepository: Repository<AmbulanceEntity>,

    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findAllAmbulanceRequests() {
    const ambulanceRequests = await this.ambulanceRequestRepository.find({
      where: { deletedAt: null },
    });

    return await Promise.all(
      ambulanceRequests.map(async (ambulanceRequest) => {
        const ambulance = await this.ambulanceRepository.findOne({
          where: { _id: ambulanceRequest.ambulance },
          select: ['driver_name', 'ambulance_number', 'contact', 'location'],
        });
        const requester = await this.userRepository.findOne({
          where: { _id: ambulanceRequest.requester },
          select: ['fullname', 'email', 'contact', 'location'],
        });
        return { ...ambulanceRequest, ambulance, requester };
      }),
    );
  }

  async findAmbulanceRequestById(ambulanceRequestId: string) {
    const ambulanceRequest = await this.ambulanceRequestRepository.findOneBy({
      _id: convertToObjectId(ambulanceRequestId),
    });
    const ambulance = await this.ambulanceRepository.findOne({
      where: { _id: ambulanceRequest.ambulance },
      select: ['driver_name', 'ambulance_number', 'contact', 'location'],
    });
    const requester = await this.userRepository.findOne({
      where: { _id: ambulanceRequest.requester },
      select: ['fullname', 'email', 'contact', 'location'],
    });
    return { ...ambulanceRequest, ambulance, requester };
  }
}
