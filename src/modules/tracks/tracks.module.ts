import { Module } from '@nestjs/common';
import { TracksController } from './presenter/tracks.controller';
import { TracksService } from './service/tracks.service';
import { TracksRepository } from './data/tracks.repository';

@Module({
  controllers: [TracksController],
  providers: [TracksService, TracksRepository],
  exports: [TracksRepository, TracksService],
})
export class TracksModule {}
