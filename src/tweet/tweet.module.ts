import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HashtagModule } from '../hashtag/hashtag.module';
import { UsersModule } from '../users/users.module';
import { TweetController } from './tweet.controller';
import { Tweet } from './tweet.entity';
import { TweetService } from './tweet.service';

@Module({
  controllers: [TweetController],
  providers: [TweetService],
  imports: [UsersModule, HashtagModule, TypeOrmModule.forFeature([Tweet])],
  exports: [TweetService],
})
export class TweetModule {}
