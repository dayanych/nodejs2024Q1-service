import { Injectable, NotFoundException } from '@nestjs/common';
import { Artist } from 'src/common/entities/artist';
import { ArtistsRepository } from '../data/artists.repository';
import { AlbumsRepository } from 'src/modules/album/data/albums.repository';
import { TracksRepository } from 'src/modules/tracks/data/tracks.repository';
import { FavoritesRepository } from 'src/modules/favorites/data/favorites.repository';

@Injectable()
export class ArtistsService {
  constructor(
    private readonly artistsRepository: ArtistsRepository,
    private readonly albumsRepository: AlbumsRepository,
    private readonly tracksRepository: TracksRepository,
    private readonly favoritesRepository: FavoritesRepository,
  ) {}

  getAllArtists(): Promise<Artist[]> {
    return this.artistsRepository.getAllArtists();
  }

  getArtistById(id: string): Promise<Artist | null> {
    const artist = this.artistsRepository.getArtistById(id);

    if (!artist) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }

    return artist;
  }

  addArtist(artist: { name: string; grammy: boolean }): Promise<Artist> {
    return this.artistsRepository.addArtist(artist);
  }

  async updateArtist(
    id: string,
    changes: { name: string; grammy: boolean },
  ): Promise<Artist> {
    const artist = await this.artistsRepository.getArtistById(id);

    if (!artist) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }

    return this.artistsRepository.updateArtist(id, changes);
  }

  async deleteArtist(id: string): Promise<void> {
    const artist = await this.artistsRepository.getArtistById(id);

    if (!artist) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }

    await this.artistsRepository.deleteArtist(id);
    await this.albumsRepository.deleteArtistFromAlbum(artist.id);
    await this.tracksRepository.deleteArtistFromTracks(artist.id);
    await this.favoritesRepository.deleteArtistFromFav(id);
  }
}
