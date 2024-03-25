import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AlbumsService } from 'src/modules/album/service/albums.service';
import { ArtistsService } from 'src/modules/artists/service/artists.service';
import { FavoritesRepository } from '../data/favorites.repository';
import { TracksService } from 'src/modules/tracks/service/tracks.service';
import { Favorites } from 'src/common/entities/favorites';

@Injectable()
export class FavoritesService {
  constructor(
    private readonly favoritesRepository: FavoritesRepository,
    private readonly artistsService: ArtistsService,
    private readonly albumsService: AlbumsService,
    private readonly tracksService: TracksService,
  ) {}

  async getAllFavorites(): Promise<Favorites> {
    const favorites =
      await this.favoritesRepository.getFavoritesWithRelations();

    return favorites;
  }

  async addTrack(trackId: string): Promise<void> {
    try {
      await this.tracksService.getTrackById(trackId);
    } catch {
      throw new UnprocessableEntityException('Entity absence');
    }

    await this.favoritesRepository.addTrackToFav(trackId);
  }

  async addAlbum(albumId: string): Promise<void> {
    try {
      await this.albumsService.getAlbumById(albumId);
    } catch {
      throw new UnprocessableEntityException('Entity absence');
    }

    await this.favoritesRepository.addAlbumToFav(albumId);
  }

  async addArtist(artistId: string): Promise<void> {
    try {
      await this.artistsService.getArtistById(artistId);
    } catch {
      throw new UnprocessableEntityException('Artist absence');
    }

    this.favoritesRepository.addArtistToFav(artistId);
  }

  async deleteTrack(trackId: string): Promise<void> {
    await this.tracksService.getTrackById(trackId);

    const isTrackInFavorites =
      await this.favoritesRepository.checkIfTrackExistsFavorite(trackId);

    if (!isTrackInFavorites) {
      throw new NotFoundException(
        `Track with id ${trackId} not found in favorites`,
      );
    }

    await this.favoritesRepository.deleteTrackFromFav(trackId);
  }

  async deleteAlbum(albumId: string): Promise<void> {
    await this.albumsService.getAlbumById(albumId);

    const isAlbumInFavorites =
      await this.favoritesRepository.checkIfAlbumExistsFavorite(albumId);
    if (!isAlbumInFavorites) {
      throw new NotFoundException(
        `Album with id ${albumId} not found in favorites`,
      );
    }

    await this.favoritesRepository.deleteAlbumFromFavs(albumId);
  }

  async deleteArtist(artistId: string): Promise<void> {
    await this.artistsService.getArtistById(artistId);

    const isArtistInFavorites =
      await this.favoritesRepository.checkIfArtistExistsFavorite(artistId);
    if (!isArtistInFavorites) {
      throw new NotFoundException(
        `Artist with id ${artistId} not found in favorites`,
      );
    }

    await this.favoritesRepository.deleteArtistFromFav(artistId);
  }
}
