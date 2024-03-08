import { Module, forwardRef } from '@nestjs/common';
import { AlbumsModule } from '../album/albums.module';
import { ArtistsController } from './presenter/artists.controller';
import { ArtistsRepository } from './data/artists.repository';
import { ArtistsService } from './service/artists.service';
import { TracksModule } from '../tracks/tracks.module';

@Module({
  imports: [forwardRef(() => AlbumsModule), TracksModule],
  controllers: [ArtistsController],
  providers: [ArtistsRepository, ArtistsService],
  exports: [ArtistsService],
})
export class ArtistsModule {}
