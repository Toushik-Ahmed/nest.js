import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class TweetService {
  constructor(private readonly usersService: UsersService) {}

  tweets: { text: string; date: Date; userId: number }[] = [
    { text: 'Hello World', date: new Date('2023-01-01'), userId: 1 },
    { text: 'NestJS is awesome', date: new Date('2023-02-01'), userId: 2 },
    { text: 'I love programming', date: new Date('2023-03-01'), userId: 1 },
  ];
  getTweetsByUserId(userId: number) {
    const user = this.usersService.getUserById(userId);
    if (!user) {
      return { message: 'User not found' };
    }
    return {
      user: user,
      tweets: this.tweets.filter((tweet) => tweet.userId === userId),
    };
  }
}
