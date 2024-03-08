import { Module } from '@nestjs/common';
import { FavoritesController } from './presenter/favorites.controller';
import { FavoritesService } from './service/favorites.service';
import { FavoritesRepository } from './data/favorites.repository';
import { AlbumsModule } from '../album/albums.module';
import { ArtistsModule } from '../artists/artists.module';
import { TracksModule } from '../tracks/tracks.module';

@Module({
  imports: [AlbumsModule, ArtistsModule, TracksModule],
  controllers: [FavoritesController],
  providers: [FavoritesService, FavoritesRepository],
})
export class FavoritesModule {}
