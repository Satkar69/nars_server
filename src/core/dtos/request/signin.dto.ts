import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AdminSignInDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}

export class UserSignInDto {
  @IsNotEmpty()
  contact: string;

  @IsNotEmpty()
  password: string;
}

export class AmbulanceSignInDto extends UserSignInDto {}
