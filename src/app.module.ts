import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfileModule } from './profile/profile.module';
import { TweetModule } from './tweet/tweet.module';
import { UsersModule } from './users/users.module';
import { HashtagModule } from './hashtag/hashtag.module';

@Module({
  imports: [
    TweetModule,
    UsersModule,
    TypeOrmModule.forRootAsync({
      imports: [],
      inject: [],
      useFactory: () => ({
        type: 'postgres',
        // entities: [User, Profile],
        autoLoadEntities: true,//if you use this you dont need to add entities array
        synchronize: true, //should be false in production
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: '1998',
        database: 'nestjs',
      }),
    }),
    ProfileModule,
    HashtagModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
