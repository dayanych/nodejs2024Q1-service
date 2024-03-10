import { Injectable, NotFoundException } from '@nestjs/common';
import { TracksRepository } from '../data/tracks.repository';
import { Track } from 'src/common/entities/track';
import { FavoritesRepository } from 'src/modules/favorites/data/favorites.repository';

@Injectable()
export class TracksService {
  constructor(
    private readonly tracksRepository: TracksRepository,
    private readonly favoritesRepository: FavoritesRepository,
  ) {}

  getAllTracks(): Track[] {
    return this.tracksRepository.getAllTracks();
  }

  getTrackById(id: string): Track {
    const track = this.tracksRepository.getTrackById(id);

    if (!track) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }

    return track;
  }

  addTrack(dto: Omit<Track, 'id'>): Track {
    return this.tracksRepository.addTrack(dto);
  }

  changeTrack(id: string, changes: Omit<Track, 'id'>): Track {
    const track = this.tracksRepository.getTrackById(id);

    if (!track) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }
    return this.tracksRepository.changeTrack(id, changes);
  }

  deleteTrack(id: string): void {
    const track = this.tracksRepository.getTrackById(id);

    if (!track) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }

    this.tracksRepository.deleteTrack(id);
    this.favoritesRepository.deleteTrack(id);
  }
}
