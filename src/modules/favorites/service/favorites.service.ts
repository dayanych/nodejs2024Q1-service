import { Injectable, NotFoundException } from '@nestjs/common';
import { AlbumsService } from 'src/modules/album/service/albums.service';
import { ArtistsService } from 'src/modules/artists/service/artists.service';
import { FavoritesRepository } from '../data/favorites.repository';
import { TracksService } from 'src/modules/tracks/service/tracks.service';

@Injectable()
export class FavoritesService {
  constructor(
    private readonly favoritesRepository: FavoritesRepository,
    private readonly artistsService: ArtistsService,
    private readonly albumsService: AlbumsService,
    private readonly tracksService: TracksService,
  ) {}

  getAllFavorites() {
    const favorites = this.favoritesRepository.getAllFavorites();

    const favArtists = favorites.artists.map((artistId) => {
      return this.artistsService.getArtistById(artistId);
    });

    const favAlbums = favorites.albums.map((albumId) => {
      return this.albumsService.getAlbumById(albumId);
    });

    const favTracks = favorites.tracks.map((trackId) => {
      return this.tracksService.getTrackById(trackId);
    });

    return {
      artists: favArtists,
      albums: favAlbums,
      tracks: favTracks,
    };
  }

  addTrack(trackId: string) {
    this.tracksService.getTrackById(trackId);

    this.favoritesRepository.addTrack(trackId);
  }

  addAlbum(albumId: string) {
    this.albumsService.getAlbumById(albumId);

    this.favoritesRepository.addAlbum(albumId);
  }

  addArtist(artistId: string) {
    this.artistsService.getArtistById(artistId);

    this.favoritesRepository.addArtist(artistId);
  }

  deleteTrack(trackId: string) {
    this.tracksService.getTrackById(trackId);

    const isTrackInFavorites =
      this.favoritesRepository.checkIfTrackExistsFavorite(trackId);
    if (!isTrackInFavorites) {
      throw new NotFoundException(
        `Track with id ${trackId} not found in favorites`,
      );
    }

    this.favoritesRepository.deleteTrack(trackId);
  }

  deleteAlbum(albumId: string) {
    this.albumsService.getAlbumById(albumId);

    const isAlbumInFavorites =
      this.favoritesRepository.checkIfAlbumExistsFavorite(albumId);
    if (!isAlbumInFavorites) {
      throw new NotFoundException(
        `Album with id ${albumId} not found in favorites`,
      );
    }

    this.favoritesRepository.deleteAlbum(albumId);
  }

  deleteArtist(artistId: string): void {
    this.artistsService.getArtistById(artistId);

    const isArtistInFavorites =
      this.favoritesRepository.checkIfArtistExistsFavorite(artistId);
    if (!isArtistInFavorites) {
      throw new NotFoundException(
        `Artist with id ${artistId} not found in favorites`,
      );
    }

    this.favoritesRepository.deleteArtist(artistId);
  }
}
