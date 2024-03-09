import { Injectable } from '@nestjs/common';
import { Favorites } from 'src/common/entities/favorites';

@Injectable()
export class FavoritesRepository {
  private favorites: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  getAllFavorites(): Favorites {
    return this.favorites;
  }

  addTrack(trackId: string): void {
    this.favorites.tracks.push(trackId);
  }

  addAlbum(albumId: string): void {
    this.favorites.albums.push(albumId);
  }

  addArtist(artistId: string): void {
    this.favorites.artists.push(artistId);
  }

  deleteTrack(trackId: string): void {
    const index = this.favorites.tracks.indexOf(trackId);

    if (index !== -1) {
      this.favorites.tracks.splice(index, 1);
    }
  }

  deleteAlbum(albumId: string): void {
    const index = this.favorites.albums.indexOf(albumId);

    if (index !== -1) {
      this.favorites.albums.splice(index, 1);
    }
  }

  deleteArtist(artistId: string): void {
    const index = this.favorites.artists.indexOf(artistId);

    if (index !== -1) {
      this.favorites.artists.splice(index, 1);
    }
  }

  checkIfTrackExistsFavorite(trackId: string): boolean {
    return this.favorites.tracks.includes(trackId);
  }

  checkIfArtistExistsFavorite(artistId: string): boolean {
    return this.favorites.artists.includes(artistId);
  }

  checkIfAlbumExistsFavorite(albumId: string): boolean {
    return this.favorites.albums.includes(albumId);
  }
}
