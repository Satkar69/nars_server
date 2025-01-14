import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { convertToObjectId } from 'src/common/helpers/convert-to-object-id';
import {
  CreateAmbulanceDto,
  EditAmbulanceDto,
} from 'src/core/dtos/request/ambulance.dto';
import { AmbulanceEntity } from 'src/data-services/mgdb/entities/ambulance.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdminAmbulanceUseCaseService {
  constructor(
    @InjectRepository(AmbulanceEntity)
    private ambulanceRepository: Repository<AmbulanceEntity>,
  ) {}

  async findAllAmbulance() {
    return await this.ambulanceRepository.find();
  }

  async createAmbulance(dto: CreateAmbulanceDto): Promise<AmbulanceEntity> {
    const newAmbulance = this.ambulanceRepository.create(dto);
    return await this.ambulanceRepository.save(newAmbulance);
  }

  async updateAmbulance(ambulanceId: string, dto: EditAmbulanceDto) {
    const ambulance = await this.ambulanceRepository.findOneBy({
      _id: convertToObjectId(ambulanceId),
    });

    if (!ambulance)
      throw new NotFoundException('ambulance with this id does not exist');

    const updatedAmbulance = { ...ambulance, dto };

    await this.ambulanceRepository.update(
      { _id: ambulance._id },
      updatedAmbulance,
    );

    return updatedAmbulance;
  }

  async deleteAmbulance(ambulanceId: string) {
    const ambulance = await this.ambulanceRepository.findOneBy({
      _id: convertToObjectId(ambulanceId),
    });

    if (!ambulance)
      throw new NotFoundException('ambulance with this id does not exist');

    const deletedAmbulance = { ...ambulance, deletedAt: new Date() };

    await this.ambulanceRepository.update(
      { _id: ambulance._id },
      deletedAmbulance,
    );

    return deletedAmbulance;
  }
}
