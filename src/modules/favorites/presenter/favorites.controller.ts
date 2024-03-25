import { Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FavoritesService } from '../service/favorites.service';
import { FavoriteResponse } from './responses/favorite.response';
import { TrackIdParam } from 'src/modules/tracks/presenter/params/track-id.param';
import { AlbumIdParam } from 'src/modules/album/presenter/params/album-id.param';
import { ArtistIdParam } from 'src/modules/artists/presenter/params/artist-id.param';
import { StatusCodes } from 'http-status-codes';
import { Favorites } from 'src/common/entities/favorites';

@ApiTags('Favorites')
@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @ApiOkResponse({
    description: 'Returns all favorites',
    type: FavoriteResponse,
  })
  @Get()
  getAllFavorites(): Promise<Favorites> {
    return this.favoritesService.getAllFavorites();
  }

  @ApiOkResponse({
    description: 'Add track to favorite',
  })
  @ApiNotFoundResponse({
    description: 'Track not found',
  })
  @Post('track/:trackId')
  @HttpCode(StatusCodes.CREATED)
  async addTrack(@Param() param: TrackIdParam): Promise<void> {
    await this.favoritesService.addTrack(param.trackId);
  }

  @ApiOkResponse({
    description: 'Delete track from favorite',
  })
  @ApiNotFoundResponse({
    description: 'Track not found',
  })
  @Delete('track/:trackId')
  @HttpCode(StatusCodes.NO_CONTENT)
  async deleteTrack(@Param() param: TrackIdParam): Promise<void> {
    await this.favoritesService.deleteTrack(param.trackId);
  }

  @ApiOkResponse({
    description: 'Add album to favorite',
  })
  @ApiNotFoundResponse({
    description: 'Album not found',
  })
  @Post('album/:albumId')
  @HttpCode(StatusCodes.CREATED)
  async addAlbum(@Param() param: AlbumIdParam): Promise<void> {
    await this.favoritesService.addAlbum(param.albumId);
  }

  @ApiOkResponse({
    description: 'Delete album from favorite',
  })
  @ApiNotFoundResponse({
    description: 'Album not found',
  })
  @Delete('album/:albumId')
  @HttpCode(StatusCodes.NO_CONTENT)
  async deleteAlbum(@Param() param: AlbumIdParam): Promise<void> {
    await this.favoritesService.deleteAlbum(param.albumId);
  }

  @ApiOkResponse({
    description: 'Add artist to favorite',
  })
  @ApiNotFoundResponse({
    description: 'Artist not found',
  })
  @Post('artist/:artistId')
  @HttpCode(StatusCodes.CREATED)
  async addArtist(@Param() param: ArtistIdParam): Promise<void> {
    await this.favoritesService.addArtist(param.artistId);
  }

  @ApiOkResponse({
    description: 'Delete artist from favorite',
  })
  @ApiNotFoundResponse({
    description: 'Artist not found',
  })
  @Delete('artist/:artistId')
  @HttpCode(StatusCodes.NO_CONTENT)
  async deleteArtist(@Param() param: ArtistIdParam): Promise<void> {
    await this.favoritesService.deleteArtist(param.artistId);
  }
}
