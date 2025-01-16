import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import AppNotFoundException from 'src/application/exception/app-not-found.exception';
import { convertToObjectId } from 'src/common/helpers/convert-to-object-id';
import { UserSignUpDto } from 'src/core/dtos/request/signup.dto';
import { UserEntity } from 'src/data-services/mgdb/entities/user.entity';
import { BcryptService } from 'src/libs/crypto/bcrypt/bcrypt.service';
import { ObjectId, Repository } from 'typeorm';

@Injectable()
export class UserUseCaseService {
  constructor(
    private bcryptService: BcryptService,

    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async UserSignUp(dto: UserSignUpDto) {
    const user = await this.userRepository.findOneBy({
      contact: dto.contact,
    });

    if (user) {
      throw new ConflictException('user already exists.');
    }

    const newUser = this.userRepository.create(dto);
    newUser.password = await this.bcryptService.hash(dto.password);

    return await this.userRepository.save(newUser);
  }

  async findAllUser() {
    const users = await this.userRepository.find();
    return users;
  }

  async findUserByContact(contact: string) {
    const user = await this.userRepository.findOneBy({
      contact: contact,
    });
    if (!user) {
      throw new AppNotFoundException('user does not exist');
    }
    return user;
  }

  async findUserById(userId: string) {
    const user = await this.userRepository.findOneBy({
      _id: convertToObjectId(userId),
    });
    if (!user) {
      throw new AppNotFoundException('user does not exist');
    }
    return user;
  }
}
