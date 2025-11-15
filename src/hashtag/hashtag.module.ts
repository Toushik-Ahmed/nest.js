import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HashtagController } from './hashtag.controller';
import { Hashtag } from './hashtag.entity';
import { HashtagService } from './hashtag.service';

@Module({
  controllers: [HashtagController],
  providers: [HashtagService],
  imports: [TypeOrmModule.forFeature([Hashtag])],
  exports: [HashtagService],
})
export class HashtagModule {}
