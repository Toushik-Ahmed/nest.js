import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ActiveUser } from '../auth/decorators/active-user.decorator';
import { PaginationDto } from '../common/pagination/dto/pagination-query.dto';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { UpdateTweetDto } from './dto/update-tweet.dto';
import { TweetService } from './tweet.service';

@Controller('tweet')
export class TweetController {
  constructor(private tweetService: TweetService) {}

  @Get(':userId')
  getAllTweetsByUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Query() paginationDto: PaginationDto,
  ) {
    // if there are other query params we can intersect them .exxample is in get-tweet-dto.ts
    console.log('page:', paginationDto.page, 'limit:', paginationDto.limit);
    return this.tweetService.getTweetsByUserId(userId, paginationDto);
  }

  @Post()
  public createTweet(
    @Body() createTweetDto: CreateTweetDto,
    @ActiveUser('sub') userId: number, // here we are getting the user info from the request
  ) {
    console.log('user info from request', userId);
    return this.tweetService.createTweet(createTweetDto, userId);
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
