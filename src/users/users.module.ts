import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import authConfig from '../auth/config/auth.config';
import { PaginationModule } from '../common/pagination/pagination.module';
import { Profile } from '../profile/profile.entity';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    // {
    //*** this will add guard to the whole app */
    //   provide: APP_GUARD,
    //   useClass: AuthorizeGuard,
    // },
  ],
  exports: [UsersService],
  imports: [
    PaginationModule,
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([User, Profile]),
    ConfigModule.forFeature(authConfig),
    JwtModule.registerAsync(authConfig.asProvider()),
  ],
})
export class UsersModule {}
