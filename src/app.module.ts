import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { ArtistsModule } from './modules/artists/artists.module';
import { AlbumsModule } from './modules/album/albums.module';
import { TracksModule } from './modules/tracks/tracks.module';

@Module({
  imports: [UsersModule, ArtistsModule, AlbumsModule, TracksModule],
})
export class AppModule {}
