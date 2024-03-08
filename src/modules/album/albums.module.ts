import { Module, forwardRef } from '@nestjs/common';
import { ArtistsModule } from '../artists/artists.module';
import { AlbumsController } from './presenter/albums.controller';
import { AlbumsService } from './service/albums.service';
import { AlbumsRepository } from './data/albums.repository';

@Module({
  imports: [forwardRef(() => ArtistsModule)],
  controllers: [AlbumsController],
  providers: [AlbumsRepository, AlbumsService],
  exports: [AlbumsRepository],
})
export class AlbumsModule {}
