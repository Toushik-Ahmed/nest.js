import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CreateProfileDto } from '../../profile/dto/create-profile.dto';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(100, {
    message: 'email is too long. Maximum length is 100 characters',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20, {
    message: 'username is too long. Maximum length is 100 characters',
  })
  userName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100, {
    message: 'password is too long. Maximum length is 100 characters',
  })
  @MinLength(6, {
    message: 'password is too short. Minimum length is 6 characters',
  })
  password: string;

  @IsOptional()
  profile?: CreateProfileDto;
}
