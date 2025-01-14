import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { GeoDataInterface } from 'src/common/interface/geodata.interface';

export class AdminSignUpDto {
  @IsNotEmpty()
  username: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class UserSignUpDto {
  @IsNotEmpty()
  fullname: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  contact: string;

  @IsNotEmpty()
  password: string;
}
