import { Injectable, NotFoundException } from '@nestjs/common';
import { Album } from 'src/common/entities/album';
import { AlbumsRepository } from '../data/albums.repository';
import { ArtistsService } from 'src/modules/artists/service/artists.service';

@Injectable()
export class AlbumsService {
  constructor(
    private readonly albumsRepository: AlbumsRepository,
    private readonly artistsService: ArtistsService,
  ) {}

  getAllAlbums(): Album[] {
    return this.albumsRepository.getAllAlbums();
  }

  getAlbumById(id: string): Album {
    const album = this.albumsRepository.getAlbumById(id);

    if (!album) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }

    return album;
  }

  addAlbum(album: { name: string; year: number; artistId: string }): Album {
    if (album.artistId) {
      this.artistsService.getArtistById(album.artistId);
    }

    return this.albumsRepository.addAlbum(album);
  }

  updateAlbum(id: string, changes: { name: string; year: number }): Album {
    const album = this.albumsRepository.getAlbumById(id);

    if (!album) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }

    if (album.artistId) {
      this.artistsService.getArtistById(album.artistId);
    }

    return this.albumsRepository.changeAlbum(id, changes);
  }

  deleteAlbum(id: string): void {
    const album = this.albumsRepository.getAlbumById(id);

    if (!album) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }

    this.albumsRepository.deleteAlbum(id);
  }

  deleteArtistFromAlbum(artistId: string): void {
    this.albumsRepository.deleteArtistFromAlbum(artistId);
  }
}
