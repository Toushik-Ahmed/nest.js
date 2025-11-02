import { IsBoolean, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class GetUserParamDto {
  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  isMarried: boolean;
}
