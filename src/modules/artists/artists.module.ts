import { Module, forwardRef } from '@nestjs/common';
import { AlbumsModule } from '../album/albums.module';
import { ArtistsController } from './presenter/artists.controller';
import { ArtistsRepository } from './data/artists.repository';
import { ArtistsService } from './service/artists.service';
import { TracksModule } from '../tracks/tracks.module';
import { FavoritesModule } from '../favorites/favorites.module';
import { PrismaModule } from '../prisma/prisma.module';
import { ArtistResource } from './presenter/resources/artist.resource';

@Module({
  imports: [
    forwardRef(() => AlbumsModule),
    TracksModule,
    FavoritesModule,
    PrismaModule,
  ],
  controllers: [ArtistsController],
  providers: [ArtistsRepository, ArtistsService, ArtistResource],
  exports: [ArtistsService, ArtistsRepository, ArtistResource],
})
export class ArtistsModule {}
