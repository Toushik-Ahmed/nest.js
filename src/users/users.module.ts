import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaginationModule } from '../common/pagination/pagination.module';
import { Profile } from '../profile/profile.entity';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
  imports: [PaginationModule, TypeOrmModule.forFeature([User, Profile])],
})
export class UsersModule {}
