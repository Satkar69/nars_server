import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSignInDto } from 'src/core/dtos/request/signin.dto';
import { UserEntity } from 'src/data-services/mgdb/entities/user.entity';
import { BcryptService } from 'src/libs/crypto/bcrypt/bcrypt.service';
import { JwtTokenService } from 'src/libs/token/jwt/jwt-token.service';
import { Repository } from 'typeorm';

@Injectable()
export class UserAuthUseCaseService {
  constructor(
    private bcryptService: BcryptService,
    private jwtTokenService: JwtTokenService,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async signIn(dto: UserSignInDto) {
    const user = await this.userRepository.findOne({
      where: { contact: dto.contact },
    });

    if (!user) throw new NotFoundException('user does not exist.');

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
