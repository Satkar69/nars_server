import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Validate,
  ValidationError,
} from 'class-validator';
import AppException from 'src/application/exception/app.exception';

export class AdminSignInDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}

export class UserSignInDto {
  @IsOptional()
  contact: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class AmbulanceSignInDto extends UserSignInDto {}
