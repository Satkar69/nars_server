import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from 'src/application/decorators/public.decorator';
import { JwtTokenService } from 'src/libs/token/jwt/jwt-token.service';
import { Request } from 'express';
import { convertToObjectId } from 'src/common/helpers/convert-to-object-id';
import { MongoRepository } from 'typeorm';
import { AdminEntity } from 'src/data-services/mgdb/entities/admin.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/data-services/mgdb/entities/user.entity';
import { AmbulanceEntity } from 'src/data-services/mgdb/entities/ambulance.entity';
import AppNotFoundException from '../exception/app-not-found.exception';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtTokenService: JwtTokenService,
    private reflector: Reflector,

    @InjectRepository(AdminEntity)
    private adminRepository: MongoRepository<AdminEntity>,

    @InjectRepository(UserEntity)
    private userRepository: MongoRepository<UserEntity>,

    @InjectRepository(AmbulanceEntity)
    private ambulanceRepository: MongoRepository<AmbulanceEntity>,
  ) {}

  private extractToken(request: Request): string | undefined {
    return request.headers.authorization?.split(' ')[1];
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { url: requestUrl } = request;
    const token = this.extractToken(request);

    const isPublic =
      requestUrl.startsWith('/api/nars/auth') ||
      requestUrl.startsWith('/api/nars/admin/create') ||
      requestUrl.startsWith('/api/nars/user/create')
        ? true
        : false ||
          this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(), // Check route handler (method-level metadata)
            context.getClass(), // Check controller (class-level metadata)
          ]);

    if (isPublic) return true;

    if (!token) {
      throw new UnauthorizedException('Invalid token');
    }

    const isAdmin = requestUrl.startsWith('/api/nars/admin') ? true : false;

    const isUser = requestUrl.startsWith('/api/nars/user') ? true : false;

    const isAmbulance = requestUrl.startsWith('/api/nars/ambulance')
      ? true
      : false;

    try {
      const decoded = await this.jwtTokenService.checkToken(token);

      if (isAdmin) {
        const admin = await this.adminRepository.findOneBy({
          _id: convertToObjectId(decoded._id),
        });

        if (!admin) throw new AppNotFoundException('admin does not exist');

        request.admin = admin;
      } else if (isUser) {
        const user = await this.userRepository.findOneBy({
          _id: convertToObjectId(decoded._id),
        });

        if (!user) throw new AppNotFoundException('user does not exist');

        request.user = user;
      } else if (isAmbulance) {
        const ambulance = await this.ambulanceRepository.findOneBy({
          _id: convertToObjectId(decoded._id),
        });

        if (!ambulance)
          throw new AppNotFoundException('ambulance does not exist');

        request.ambulance = ambulance;
      }
    } catch (error) {
      Logger.error(error.message);
      throw new UnauthorizedException('Invalid Token');
    }
    return true;
  }
}
