import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { Favorites } from 'src/common/entities/favorites';
import { PrismaRepository } from 'src/modules/prisma/data/prisma.repository';

@Injectable()
export class FavoritesRepository {
  favoritesId: string | null;
  constructor(private prismaRepository: PrismaRepository) {
    this.favoritesId = null;
  }

  async generateFavorites(): Promise<void> {
    const favorites = await this.prismaRepository.favorites.create({
      data: {
        id: uuidv4(),
      },
    });

    this.favoritesId = favorites.id;
  }

  async getFavoritesWithRelations(): Promise<Favorites> {
    if (!this.favoritesId) {
      await this.generateFavorites();
    }

    return this.prismaRepository.favorites.findUnique({
      where: {
        id: this.favoritesId,
      },
      include: {
        artists: true,
        albums: true,
        tracks: true,
      },
    });
  }

  async addTrackToFav(trackId: string): Promise<void> {
    if (!this.favoritesId) {
      await this.generateFavorites();
    }

    await this.prismaRepository.track.updateMany({
      where: { id: trackId },
      data: { favoriteId: this.favoritesId },
    });
  }

  async addAlbumToFav(albumId: string): Promise<void> {
    if (!this.favoritesId) {
      await this.generateFavorites();
    }

    await this.prismaRepository.album.updateMany({
      where: { id: albumId },
      data: { favoriteId: this.favoritesId },
    });
  }

  async addArtistToFav(artistId: string): Promise<void> {
    if (!this.favoritesId) {
      await this.generateFavorites();
    }

    await this.prismaRepository.artist.updateMany({
      where: { id: artistId },
      data: { favoriteId: this.favoritesId },
    });
  }

  async deleteTrackFromFav(trackId: string): Promise<void> {
    if (!this.favoritesId) {
      await this.generateFavorites();
    }

    await this.prismaRepository.track.updateMany({
      where: { id: trackId },
      data: { favoriteId: null },
    });
  }

  async deleteAlbumFromFavs(albumId: string): Promise<void> {
    if (!this.favoritesId) {
      await this.generateFavorites();
    }

    await this.prismaRepository.album.updateMany({
      where: { id: albumId },
      data: { favoriteId: null },
    });
  }

  async deleteArtistFromFav(artistId: string): Promise<void> {
    if (!this.favoritesId) {
      await this.generateFavorites();
    }

    await this.prismaRepository.artist.updateMany({
      where: { id: artistId },
      data: { favoriteId: null },
    });
  }

  async checkIfTrackExistsFavorite(trackId: string): Promise<boolean> {
    if (!this.favoritesId) {
      await this.generateFavorites();
    }

    const favorites = await this.getFavoritesWithRelations();

    return favorites.tracks.some((track) => track.id === trackId);
  }

  async checkIfArtistExistsFavorite(artistId: string): Promise<boolean> {
    if (!this.favoritesId) {
      await this.generateFavorites();
    }

    const favorites = await this.getFavoritesWithRelations();

    return favorites.artists.some((artist) => artist.id === artistId);
  }

  async checkIfAlbumExistsFavorite(albumId: string): Promise<boolean> {
    if (!this.favoritesId) {
      await this.generateFavorites();
    }

    const favorites = await this.getFavoritesWithRelations();

    return favorites.albums.some((album) => album.id === albumId);
  }
}
