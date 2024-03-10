import { Module, forwardRef } from '@nestjs/common';
import { FavoritesController } from './presenter/favorites.controller';
import { FavoritesService } from './service/favorites.service';
import { FavoritesRepository } from './data/favorites.repository';
import { AlbumsModule } from '../album/albums.module';
import { ArtistsModule } from '../artists/artists.module';
import { TracksModule } from '../tracks/tracks.module';

@Module({
  imports: [
    forwardRef(() => AlbumsModule),
    forwardRef(() => ArtistsModule),
    forwardRef(() => TracksModule),
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService, FavoritesRepository],
  exports: [FavoritesRepository],
})
export class FavoritesModule {}
