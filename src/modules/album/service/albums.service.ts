import { Injectable, NotFoundException } from '@nestjs/common';
import { Album } from 'src/common/entities/album';
import { ArtistsService } from 'src/modules/artists/service/artists.service';
import { TracksRepository } from 'src/modules/tracks/data/tracks.repository';
import { FavoritesRepository } from 'src/modules/favorites/data/favorites.repository';
import { AlbumsRepository } from '../data/albums.repository';

@Injectable()
export class AlbumsService {
  constructor(
    private readonly albumsRepository: AlbumsRepository,
    private readonly artistsService: ArtistsService,
    private readonly tracksRepository: TracksRepository,
    private readonly favoritesRepository: FavoritesRepository,
  ) {}

  getAllAlbums(): Promise<Album[]> {
    return this.albumsRepository.getAllAlbums();
  }

  async getAlbumById(id: string): Promise<Album> {
    const album = await this.albumsRepository.getAlbumById(id);

    if (!album) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }

    return album;
  }

  async addAlbum(album: {
    name: string;
    year: number;
    artistId: string;
  }): Promise<Album> {
    if (album.artistId) {
      await this.artistsService.getArtistById(album.artistId);
    }

    return this.albumsRepository.addAlbum(album);
  }

  async updateAlbum(
    id: string,
    changes: { name: string; year: number },
  ): Promise<Album> {
    const album = await this.albumsRepository.getAlbumById(id);

    if (!album) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }

    if (album.artistId) {
      await this.artistsService.getArtistById(album.artistId);
    }

    return this.albumsRepository.changeAlbum(id, changes);
  }

  async deleteAlbum(id: string): Promise<void> {
    const album = await this.albumsRepository.getAlbumById(id);

    if (!album) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }

    await this.albumsRepository.deleteAlbum(id);
    await this.tracksRepository.deleteAlbumFromTrack(id);
    await this.favoritesRepository.deleteAlbumFromFavs(id);
  }

  async deleteArtistFromAlbum(artistId: string): Promise<void> {
    await this.albumsRepository.deleteArtistFromAlbum(artistId);
  }
}
