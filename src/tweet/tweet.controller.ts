import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { UpdateTweetDto } from './dto/update-tweet.dto';
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

  @Patch()
  public updateTweet(@Body() updateTweetDto: UpdateTweetDto) {
    return this.tweetService.updateTweet(updateTweetDto);
  }

  @Delete(':id')
  public deleteTweet(@Param('id', ParseIntPipe) id: number) {
    return this.tweetService.deleteTweet(id);
  }
}
