import {
  IsDate,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateProfileDto {
  @IsString({ message: 'firstName must be a string' })
  @MaxLength(100, {
    message: 'firstName is too long. Maximum length is 100 characters',
  })
  @MinLength(3, {
    message: 'firstName is too short. Minimum length is 3 characters',
  })
  @IsOptional()
  firstName?: string;

  @IsString({ message: 'lastName must be a string' })
  @MaxLength(100, {
    message: 'lastName is too long. Maximum length is 100 characters',
  })
  @MinLength(3, {
    message: 'lastName is too short. Minimum length is 3 characters',
  })
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsOptional()
  gender?: string;

  @IsOptional()
  @IsDate()
  dateOfBirth?: Date;

  @IsString()
  @IsOptional()
  bio?: string;
}
