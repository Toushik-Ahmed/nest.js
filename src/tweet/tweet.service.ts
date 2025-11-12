import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class TweetService {
  constructor(private readonly usersService: UsersService) {}

  getTweetsByUserId(userId: number) {}
}
