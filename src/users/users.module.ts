import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { PaginationModule } from '../common/pagination/pagination.module';
import { Profile } from '../profile/profile.entity';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
  imports: [
    PaginationModule,
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([User, Profile]),
  ],
})
export class UsersModule {}
