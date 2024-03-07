import { Injectable, NotFoundException } from '@nestjs/common';
import { Artist } from 'src/common/entities/artist';
import { ArtistsRepository } from '../data/artists.repository';

@Injectable()
export class ArtistsService {
  constructor(private readonly artistsRepository: ArtistsRepository) {}

  getAllArtists(): Artist[] {
    return this.artistsRepository.getAllArtists();
  }

  getArtistById(id: string): Artist | null {
    const artist = this.artistsRepository.getArtistById(id);

    if (!artist) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }

    return artist;
  }

  addArtist(artist: { name: string; grammy: boolean }): Artist {
    return this.artistsRepository.addArtist(artist);
  }

  updateArtist(id: string, changes: { name: string; grammy: boolean }): Artist {
    const artist = this.artistsRepository.getArtistById(id);

    if (!artist) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }

    return this.artistsRepository.updateArtist(id, changes);
  }

  deleteArtist(id: string): void {
    const artist = this.artistsRepository.getArtistById(id);

    if (!artist) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }

    this.artistsRepository.deleteArtist(id);
  }
}
