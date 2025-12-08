import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import authConfig from './auth/config/auth.config';
import { AuthorizeGuard } from './auth/guards/authorize.guard';
import { PaginationModule } from './common/pagination/pagination.module';
import { HashtagModule } from './hashtag/hashtag.module';
import { ProfileModule } from './profile/profile.module';
import { TweetModule } from './tweet/tweet.module';
import { UsersModule } from './users/users.module';

const ENV = process.env.NODE_ENV;
@Module({
  imports: [
    TweetModule,
    UsersModule,
    ProfileModule,
    HashtagModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        // entities: [User, Profile],
        autoLoadEntities: true, //if you use this you dont need to add entities array
        synchronize: true, //should be false in production
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
      }),
    }),
    PaginationModule,
    ConfigModule.forFeature(authConfig),
    JwtModule.registerAsync(authConfig.asProvider()),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD, // creating a global guard
      useClass: AuthorizeGuard,
    },
  ],
})
export class AppModule {}
