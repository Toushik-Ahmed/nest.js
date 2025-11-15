import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateHashtagDto } from './dto/create-hashtag.dto';
import { Hashtag } from './hashtag.entity';

@Injectable()
export class HashtagService {
  constructor(
    @InjectRepository(Hashtag)
    private readonly hashtagRepository: Repository<Hashtag>,
  ) {}

  public createHashtag(createHashtagDto: CreateHashtagDto) {
    const hashtag = this.hashtagRepository.create(createHashtagDto);
    return this.hashtagRepository.save(hashtag);
  }

  public async findByHashTags(hashtags: number[]) {
    return await this.hashtagRepository.find({
      where: {
        id: In(hashtags),
      },
    });
  }
}
