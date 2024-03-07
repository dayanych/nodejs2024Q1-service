import { Module } from '@nestjs/common';
import { ArtistsController } from './presenter/artists.controller';
import { ArtistsRepository } from './data/artists.repository';
import { ArtistsService } from './service/artists.service';

@Module({
  imports: [],
  controllers: [ArtistsController],
  providers: [ArtistsRepository, ArtistsService],
})
export class ArtistsModule {}
