import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import AppNotFoundException from 'src/application/exception/app-not-found.exception';
import { AmbulanceSignInDto } from 'src/core/dtos/request/signin.dto';
import { AmbulanceEntity } from 'src/data-services/mgdb/entities/ambulance.entity';
import { BcryptService } from 'src/libs/crypto/bcrypt/bcrypt.service';
import { JwtTokenService } from 'src/libs/token/jwt/jwt-token.service';
import { Repository } from 'typeorm';

@Injectable()
export class AmbulanceAuthUseCaseService {
  constructor(
    private bcryptService: BcryptService,
    private jwtTokenService: JwtTokenService,
    @InjectRepository(AmbulanceEntity)
    private ambulanceRepository: Repository<AmbulanceEntity>,
  ) {}

  async signIn(dto: AmbulanceSignInDto) {
    const ambulance = await this.ambulanceRepository.findOne({
      where: { contact: dto.contact },
    });

    if (!ambulance)
      throw new AppNotFoundException(
        'no ambulance with provided contact is available.',
      );

    const isPasswordMatched = await this.bcryptService.compare(
      dto.password,
      ambulance.password,
    );

    if (!isPasswordMatched)
      throw new UnauthorizedException('password is incorrect.');

    const payload = { _id: ambulance._id };
    const accessToken = await this.jwtTokenService.createToken(payload);
    return { accessToken, ambulance };
  }
}
