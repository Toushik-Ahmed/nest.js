import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationDto } from '../common/pagination/dto/pagination-query.dto';
import { Pagination } from '../common/pagination/paginate.interface';
import { PaginationProvider } from '../common/pagination/pagination.provider';
import { Hashtag } from '../hashtag/hashtag.entity';
import { HashtagService } from '../hashtag/hashtag.service';
import { UsersService } from '../users/users.service';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { UpdateTweetDto } from './dto/update-tweet.dto';
import { Tweet } from './tweet.entity';

@Injectable()
export class TweetService {
  constructor(
    private readonly usersService: UsersService,
    private readonly hastagService: HashtagService,
    private readonly paginationProvider: PaginationProvider,
    @InjectRepository(Tweet)
    private readonly tweetRepository: Repository<Tweet>,
  ) {}

  public async getTweetsByUserId(
    userId: number,
    paginationDto: PaginationDto,
  ): Promise<Pagination<Tweet>> {
    const user = await this.usersService.findUserById(userId);
    if (!user) {
      throw new NotFoundException(`user with userId ${userId} not  found`); // exception handling
    }
    return await this.paginationProvider.paginateQuery(
      paginationDto,
      this.tweetRepository,
      { user: { id: userId } },
    );
  }

  public async createTweet(createTweetDto: CreateTweetDto) {
    //find the user by userId
    const user = await this.usersService.findUserById(createTweetDto.userId);

    //fetch all the hashtags
    let hashtags: Hashtag[] = [];
    if (createTweetDto?.hashtags?.length) {
      hashtags = await this.hastagService.findByHashTags(
        createTweetDto.hashtags,
      );
    }

    //create the tweet
    if (user) {
      const tweet = this.tweetRepository.create({
        ...createTweetDto,
        user,
        hashtags,
      });
      return this.tweetRepository.save(tweet);
    }
  }

  public async updateTweet(updateTweetDto: UpdateTweetDto) {
    // Load tweet with existing hashtags
    const tweet = await this.tweetRepository.findOne({
      where: { id: updateTweetDto.id },
      // relations: ['hashtags'],
    });

    if (!tweet) return;

    tweet.text = updateTweetDto.text ?? tweet.text;
    tweet.image = updateTweetDto.image ?? tweet.image;

    // Only update hashtags if the client sent the field
    if (updateTweetDto.hashtags !== undefined) {
      const hashtags = await this.hastagService.findByHashTags(
        updateTweetDto.hashtags,
      );
      tweet.hashtags = hashtags; // Can be empty array → clears hashtags
    }

    return await this.tweetRepository.save(tweet);
  }

  //when we have unidirectional many to many relationship if the owning side is deleted
  //  then the relation will be removed from the join table automatically
  public async deleteTweet(tweetId: number) {
    await this.tweetRepository.delete({ id: tweetId });

    return {
      message: 'Tweet deleted successfully',
      deleted: true,
    };
  }
}
