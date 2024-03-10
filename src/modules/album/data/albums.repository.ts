import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { Album } from 'src/common/entities/album';

@Injectable()
export class AlbumsRepository {
  private albums: Album[] = [];

  getAllAlbums(): Album[] {
    return this.albums;
  }

  getAlbumById(id: string): Album {
    const album = this.albums.find((album) => album.id === id);

    return album;
  }

  addAlbum(album: { name: string; year: number; artistId: string }): Album {
    const newAlbum: Album = {
      id: uuidv4(),
      name: album.name,
      year: album.year,
      artistId: album.artistId,
    };

    this.albums.push(newAlbum);

    return newAlbum;
  }

  changeAlbum(id: string, changes: { name: string; year: number }): Album {
    this.albums = this.albums.map((album) => {
      if (album.id === id) {
        return {
          ...album,
          ...changes,
        };
      }
      return album;
    });

    return this.getAlbumById(id);
  }

  deleteAlbum(id: string): void {
    this.albums = this.albums.filter((album) => album.id !== id);
  }

  deleteArtistFromAlbum(artistId: string): void {
    this.albums = this.albums.map((album) => {
      if (album.artistId === artistId) {
        return {
          ...album,
          artistId: null,
        };
      }
      return album;
    });
  }
}
