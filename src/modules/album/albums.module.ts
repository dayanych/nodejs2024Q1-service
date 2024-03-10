import { Module, forwardRef } from '@nestjs/common';
import { ArtistsModule } from '../artists/artists.module';
import { AlbumsController } from './presenter/albums.controller';
import { AlbumsService } from './service/albums.service';
import { AlbumsRepository } from './data/albums.repository';
import { TracksModule } from '../tracks/tracks.module';
import { FavoritesModule } from '../favorites/favorites.module';

@Module({
  imports: [forwardRef(() => ArtistsModule), TracksModule, FavoritesModule],
  controllers: [AlbumsController],
  providers: [AlbumsRepository, AlbumsService],
  exports: [AlbumsRepository, AlbumsService],
})
export class AlbumsModule {}
