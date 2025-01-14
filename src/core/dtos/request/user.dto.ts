import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { GeoDataInterface } from 'src/common/interface/geodata.interface';

export class EditUserDto {
  fullname?: string;
  @IsEmail()
  email?: string;
  contact?: string;
  location?: GeoDataInterface;
}
