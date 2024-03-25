import { Module, forwardRef } from '@nestjs/common';
import { ArtistsModule } from '../artists/artists.module';
import { AlbumsController } from './presenter/albums.controller';
import { AlbumsService } from './service/albums.service';
import { AlbumsRepository } from './data/albums.repository';
import { TracksModule } from '../tracks/tracks.module';
import { FavoritesModule } from '../favorites/favorites.module';
import { PrismaModule } from '../prisma/prisma.module';
import { AlbumResource } from './presenter/resources/album.resource';

@Module({
  imports: [
    forwardRef(() => ArtistsModule),
    TracksModule,
    FavoritesModule,
    PrismaModule,
  ],
  controllers: [AlbumsController],
  providers: [AlbumsRepository, AlbumsService, AlbumResource],
  exports: [AlbumsRepository, AlbumsService, AlbumResource],
})
export class AlbumsModule {}
