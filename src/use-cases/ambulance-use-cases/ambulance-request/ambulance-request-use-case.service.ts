import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import AppNotFoundException from 'src/application/exception/app-not-found.exception';
import { AmbulanceRequestStatusEnum } from 'src/common/enums/ambulance-request-status.enum';
import { AmbulanceStatusEnum } from 'src/common/enums/ambulance-status.enum';
import { convertToObjectId } from 'src/common/helpers/convert-to-object-id';
import { EditAmbulanceRequestDto } from 'src/core/dtos/request/ambulance-request.dto';
import { AmbulanceRequestEntity } from 'src/data-services/mgdb/entities/ambulance-request.entity';
import { AmbulanceEntity } from 'src/data-services/mgdb/entities/ambulance.entity';
import { UserEntity } from 'src/data-services/mgdb/entities/user.entity';
import { MongoRepository } from 'typeorm';

// TODO :: ambulance arival time logic
// TODO :: list and order the ambulance requests by the emergency status

@Injectable()
export class AmbulanceRequestUseCaseService {
  constructor(
    @InjectRepository(AmbulanceRequestEntity)
    private ambulanceRequestRepository: MongoRepository<AmbulanceRequestEntity>,

    @InjectRepository(AmbulanceEntity)
    private ambulanceRepository: MongoRepository<AmbulanceEntity>,

    @InjectRepository(UserEntity)
    private userRepository: MongoRepository<UserEntity>,
  ) {}

  async findMyRequests(ambulanceId: ObjectId) {
    const ambulanceRequests = await this.ambulanceRequestRepository.find({
      where: { ambulance: ambulanceId, deletedAt: null },
    });

    const ambulance = await this.ambulanceRepository.findOneBy({
      _id: ambulanceId,
    });

    return await Promise.all(
      ambulanceRequests.map(async (ambulanceRequest) => {
        const requester = await this.userRepository.findOne({
          where: { _id: ambulanceRequest.requester },
          select: ['fullname', 'email', 'contact', 'location'],
        });

        return { ...ambulanceRequest, ambulance: ambulance, requester };
      }),
    );
  }

  async ambulanceRequestAction(
    ambulanceRequestId: string,
    dto: EditAmbulanceRequestDto,
  ) {
    const ambulanceRequest = await this.ambulanceRequestRepository.findOneBy({
      _id: convertToObjectId(ambulanceRequestId),
    });

    if (!ambulanceRequest)
      throw new AppNotFoundException('ambulance request does not exist');

    const ambulance = await this.ambulanceRepository.findOneBy({
      _id: ambulanceRequest.ambulance,
    });

    const updatedAmbulanceRequest = {
      ...ambulanceRequest,
      status: dto.status
        ? dto.status === AmbulanceRequestStatusEnum.ENROUTE
          ? AmbulanceRequestStatusEnum.ENROUTE
          : dto.status === AmbulanceRequestStatusEnum.CANCELLED
            ? AmbulanceRequestStatusEnum.CANCELLED
            : dto.status === AmbulanceRequestStatusEnum.COMPLETED
              ? AmbulanceRequestStatusEnum.COMPLETED
              : ambulanceRequest.status
        : ambulanceRequest.status,
      deletedAt: dto.status
        ? dto.status === AmbulanceRequestStatusEnum.COMPLETED
          ? new Date()
          : ambulanceRequest.deletedAt
        : ambulanceRequest.deletedAt,
    };

    await this.ambulanceRequestRepository.update(
      { _id: ambulanceRequest._id },
      updatedAmbulanceRequest,
    );

    if (dto.status === AmbulanceRequestStatusEnum.ENROUTE) {
      const updatedAmbulance = {
        ...ambulance,
        status: AmbulanceStatusEnum.OCCUPIED,
      };
      await this.ambulanceRepository.update(
        { _id: ambulance._id },
        updatedAmbulance,
      );
    } else if (dto.status === AmbulanceRequestStatusEnum.COMPLETED) {
      const updatedAmbulance = {
        ...ambulance,
        status: AmbulanceStatusEnum.AVAILABLE,
      };
      await this.ambulanceRepository.update(
        { _id: ambulance._id },
        updatedAmbulance,
      );
    }

    return updatedAmbulanceRequest;
  }
}
