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
    console.log(this.favorites);
    
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
    this.favorites.tracks = this.favorites.tracks.filter(
      (track) => track !== trackId,
    );
  }

  deleteAlbum(albumId: string): void {
    this.favorites.albums = this.favorites.albums.filter(
      (album) => album !== albumId,
    );
  }

  deleteArtist(artistId: string): void {
    this.favorites.artists = this.favorites.artists.filter(
      (artist) => artist !== artistId,
    );
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
