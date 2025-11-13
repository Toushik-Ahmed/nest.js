import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { Tweet } from './tweet.entity';

@Injectable()
export class TweetService {
  constructor(
    private readonly usersService: UsersService,
    @InjectRepository(Tweet)
    private readonly tweetRepository: Repository<Tweet>,
  ) {}

  public async getTweetsByUserId(userId: number) {
    return await this.tweetRepository.find({
      where: {
        user: { id: userId },
      },
      relations: { user: true },
    });
  }

  public async createTweet(createTweetDto: CreateTweetDto) {
    //find the user by userId
    const user = await this.usersService.findUserById(createTweetDto.userId);

    //create the tweet
    if (user) {
      const tweet = this.tweetRepository.create({
        ...createTweetDto,
        user: user,
      });
      return this.tweetRepository.save(tweet);
    }
    //save the tweet
  }
}
