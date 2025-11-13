import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTweetDto {
  @IsNotEmpty()
  @IsString()
  text: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsNotEmpty()
  @IsInt()
  userId: number;
}
