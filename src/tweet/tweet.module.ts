import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { TweetController } from './tweet.controller';
import { Tweet } from './tweet.entity';
import { TweetService } from './tweet.service';

@Module({
  controllers: [TweetController],
  providers: [TweetService],
  imports: [UsersModule, TypeOrmModule.forFeature([Tweet])],
})
export class TweetModule {}
