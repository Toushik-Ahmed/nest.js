import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { TweetService } from './tweet.service';

@Controller('tweet')
export class TweetController {
  constructor(private tweetService: TweetService) {}

  @Get(':userId')
  getAllTweetsByUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.tweetService.getTweetsByUserId(userId);
  }

  @Post()
  public createTweet(@Body() createTweetDto: CreateTweetDto) {
    return this.tweetService.createTweet(createTweetDto);
  }
}
