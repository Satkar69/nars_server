import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { AmbulanceRequestStatusEnum } from 'src/common/enums/ambulance-request-status.enum';
import { AmbulanceStatusEnum } from 'src/common/enums/ambulance-status.enum';
import { convertToObjectId } from 'src/common/helpers/convert-to-object-id';
import {
  CreateAmbulanceRequestDto,
  EditAmbulanceRequestDto,
} from 'src/core/dtos/request/ambulance-request.dto';
import { AmbulanceRequestEntity } from 'src/data-services/mgdb/entities/ambulance-request.entity';
import { AmbulanceEntity } from 'src/data-services/mgdb/entities/ambulance.entity';
import { Repository } from 'typeorm';
import AppNotFoundException from 'src/application/exception/app-not-found.exception';
import AppException from 'src/application/exception/app.exception';

@Injectable()
export class UserAmbulanceRequestUseCaseService {
  constructor(
    @InjectRepository(AmbulanceRequestEntity)
    private ambulanceRequestRepository: Repository<AmbulanceRequestEntity>,

    @InjectRepository(AmbulanceEntity)
    private ambulanceReposiroty: Repository<AmbulanceEntity>,
  ) {}

  async findMyAmbulanceRequest(userId: ObjectId) {
    const ambulanceRequest = await this.ambulanceRequestRepository.findOne({
      where: { requester: userId, deletedAt: null },
    });

    if (!ambulanceRequest)
      throw new AppNotFoundException('ambulance request does not exist');

    return ambulanceRequest;
  }

  async createAmbulanceRequest(
    userId: ObjectId,
    dto: CreateAmbulanceRequestDto,
  ): Promise<AmbulanceRequestEntity> {
    const ambulance = await this.ambulanceReposiroty.findOneBy({
      _id: convertToObjectId(dto.ambulance),
    });

    if (!ambulance) throw new AppNotFoundException('ambulance not found');

    const ambulanceRequest = await this.ambulanceRequestRepository.findOne({
      where: { requester: userId, deletedAt: null },
    });

    if (ambulanceRequest)
      throw new AppException({}, 'an ambulance request already exists', 409);

    if (ambulance.status !== AmbulanceStatusEnum.AVAILABLE)
      throw new Error('this ambulance is not available');

    const newAmbulanceRequest = this.ambulanceRequestRepository.create({
      ...dto,
      ambulance: ambulance._id,
      requester: userId,
      status: AmbulanceRequestStatusEnum.PENDING,
    });

    return await this.ambulanceRequestRepository.save(newAmbulanceRequest);
  }

  async updateAmbulanceRequest(
    ambulanceRequestId: string,
    dto: EditAmbulanceRequestDto,
  ) {
    const ambulanceRequest = await this.ambulanceRequestRepository.findOneBy({
      _id: convertToObjectId(ambulanceRequestId),
    });

    if (!ambulanceRequest)
      throw new AppNotFoundException('ambulance request does not exist');

    const updatedAmbulanceRequest = { ...ambulanceRequest, ...dto };

    await this.ambulanceRequestRepository.update(
      { _id: ambulanceRequest._id },
      updatedAmbulanceRequest,
    );

    return updatedAmbulanceRequest;
  }

  async deleteAmbulanceRequest(ambulanceRequestId: string) {
    const ambulanceRequest = await this.ambulanceRequestRepository.findOneBy({
      _id: convertToObjectId(ambulanceRequestId),
    });

    if (!ambulanceRequest)
      throw new AppNotFoundException('ambulance request does not exist');

    const deletedAmbulanceRequest = {
      ...ambulanceRequest,
      deletedAt: new Date(),
    };

    await this.ambulanceRequestRepository.update(
      { _id: ambulanceRequest._id },
      deletedAmbulanceRequest,
    );

    return deletedAmbulanceRequest;
  }
}
