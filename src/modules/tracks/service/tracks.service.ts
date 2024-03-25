import { Injectable, NotFoundException } from '@nestjs/common';
import { TracksRepository } from '../data/tracks.repository';
import { Track } from 'src/common/entities/track';
import { FavoritesRepository } from 'src/modules/favorites/data/favorites.repository';
import { TrackDto } from '../dto/track.dto';

@Injectable()
export class TracksService {
  constructor(
    private readonly tracksRepository: TracksRepository,
    private readonly favoritesRepository: FavoritesRepository,
  ) {}

  getAllTracks(): Promise<Track[]> {
    return this.tracksRepository.getAllTracks();
  }

  async getTrackById(id: string): Promise<Track> {
    const track = await this.tracksRepository.getTrackById(id);

    if (!track) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }

    return track;
  }

  addTrack(dto: TrackDto): Promise<Track> {
    return this.tracksRepository.addTrack(dto);
  }

  async changeTrack(id: string, changes: TrackDto): Promise<Track> {
    const track = await this.tracksRepository.getTrackById(id);

    if (!track) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }
    return this.tracksRepository.changeTrack(id, changes);
  }

  async deleteTrack(id: string): Promise<void> {
    const track = await this.tracksRepository.getTrackById(id);

    if (!track) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }

    await this.tracksRepository.deleteTrack(id);
    await this.favoritesRepository.deleteTrackFromFav(id);
  }
}
