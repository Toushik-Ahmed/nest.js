import { Body, Controller, Post } from '@nestjs/common';
import { CreateHashtagDto } from './dto/create-hashtag.dto';
import { HashtagService } from './hashtag.service';

@Controller('hashtag')
export class HashtagController {
  constructor(private readonly hashtagService: HashtagService) {}

  @Post()
  public async createHashtag(@Body() createHashtag: CreateHashtagDto) {
    return await this.hashtagService.createHashtag(createHashtag);
  }
}
