import { Injectable, NotFoundException } from '@nestjs/common';
import { Artist } from 'src/common/entities/artist';
import { ArtistsRepository } from '../data/artists.repository';
import { AlbumsRepository } from 'src/modules/album/data/albums.repository';
import { TracksRepository } from 'src/modules/tracks/data/tracks.repository';

@Injectable()
export class ArtistsService {
  constructor(
    private readonly artistsRepository: ArtistsRepository,
    private readonly albumsRepository: AlbumsRepository,
    private readonly tracksRepository: TracksRepository,
  ) {}

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
    this.albumsRepository.deleteArtistFromAlbum(artist.id);
    this.tracksRepository.deleteArtistFromTracks(artist.id);
  }
}
