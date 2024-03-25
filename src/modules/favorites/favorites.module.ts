import { Module, forwardRef } from '@nestjs/common';
import { FavoritesController } from './presenter/favorites.controller';
import { FavoritesService } from './service/favorites.service';
import { FavoritesRepository } from './data/favorites.repository';
import { AlbumsModule } from '../album/albums.module';
import { ArtistsModule } from '../artists/artists.module';
import { TracksModule } from '../tracks/tracks.module';
import { PrismaModule } from '../prisma/prisma.module';
import { FavoritesResource } from './presenter/resources/favorites.resource';

@Module({
  imports: [
    forwardRef(() => AlbumsModule),
    forwardRef(() => ArtistsModule),
    forwardRef(() => TracksModule),
    PrismaModule,
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService, FavoritesRepository, FavoritesResource],
  exports: [FavoritesRepository],
})
export class FavoritesModule {}
