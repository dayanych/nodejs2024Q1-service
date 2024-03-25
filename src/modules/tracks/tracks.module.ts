import { Module, forwardRef } from '@nestjs/common';
import { TracksController } from './presenter/tracks.controller';
import { TracksService } from './service/tracks.service';
import { TracksRepository } from './data/tracks.repository';
import { FavoritesModule } from '../favorites/favorites.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [forwardRef(() => FavoritesModule), PrismaModule],
  controllers: [TracksController],
  providers: [TracksService, TracksRepository],
  exports: [TracksRepository, TracksService],
})
export class TracksModule {}
