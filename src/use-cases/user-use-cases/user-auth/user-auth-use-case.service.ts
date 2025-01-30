import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSignInDto } from 'src/core/dtos/request/signin.dto';
import { UserEntity } from 'src/data-services/mgdb/entities/user.entity';
import { BcryptService } from 'src/libs/crypto/bcrypt/bcrypt.service';
import { JwtTokenService } from 'src/libs/token/jwt/jwt-token.service';
import { MongoRepository } from 'typeorm';
import AppNotFoundException from 'src/application/exception/app-not-found.exception';
import AppException from 'src/application/exception/app.exception';

@Injectable()
export class UserAuthUseCaseService {
  constructor(
    private bcryptService: BcryptService,
    private jwtTokenService: JwtTokenService,
    @InjectRepository(UserEntity)
    private userRepository: MongoRepository<UserEntity>,
  ) {}

  async signIn(dto: UserSignInDto) {
    if (!dto.contact && !dto.email)
      throw new AppException('enter your email or contact to signin');

    const user = await this.userRepository.findOne({
      where: {
        $or: [{ contact: dto.contact }, { email: dto.email }],
      },
    });

    if (!user) throw new AppNotFoundException('user does not exist.');

    const isPasswordMatched = await this.bcryptService.compare(
      dto.password,
      user.password,
    );

    if (!isPasswordMatched)
      throw new UnauthorizedException('password is incorrect.');

    const payload = { _id: user._id };
    const accessToken = await this.jwtTokenService.createToken(payload);
    return { accessToken, user };
  }
}
