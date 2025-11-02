import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNumber()
  id: number;

  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty()
  @MinLength(3, {
    message: 'Name is too short. Minimum length is 3 characters',
  })
  name: string;

  @IsString()
  @IsOptional()
  gender?: string;

  @IsEmail()
  email: string;

  @IsBoolean()
  isMarried: boolean;

  @IsNumber()
  age: number;
}
