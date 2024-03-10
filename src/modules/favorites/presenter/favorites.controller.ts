import { Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FavoritesService } from '../service/favorites.service';
import { FavoriteResponse } from './responses/favorite.response';
import { TrackIdParam } from 'src/modules/tracks/presenter/params/track-id.param';
import { AlbumIdParam } from 'src/modules/album/presenter/params/album-id.param';
import { ArtistIdParam } from 'src/modules/artists/presenter/params/artist-id.param';
import { StatusCodes } from 'http-status-codes';

@ApiTags('Favorites')
@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @ApiOkResponse({
    description: 'Returns all favorites',
    type: FavoriteResponse,
  })
  @Get()
  getAllFavorites() {
    const favorites = this.favoritesService.getAllFavorites();
    console.log(favorites);
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
  addTrack(@Param() param: TrackIdParam) {
    this.favoritesService.addTrack(param.trackId);
  }

  @ApiOkResponse({
    description: 'Delete track from favorite',
  })
  @ApiNotFoundResponse({
    description: 'Track not found',
  })
  @Delete('track/:trackId')
  @HttpCode(StatusCodes.NO_CONTENT)
  deleteTrack(@Param() param: TrackIdParam) {
    this.favoritesService.deleteTrack(param.trackId);
  }

  @ApiOkResponse({
    description: 'Add album to favorite',
  })
  @ApiNotFoundResponse({
    description: 'Album not found',
  })
  @Post('album/:albumId')
  @HttpCode(StatusCodes.CREATED)
  addAlbum(@Param() param: AlbumIdParam) {
    this.favoritesService.addAlbum(param.albumId);
  }

  @ApiOkResponse({
    description: 'Delete album from favorite',
  })
  @ApiNotFoundResponse({
    description: 'Album not found',
  })
  @Delete('album/:albumId')
  @HttpCode(StatusCodes.NO_CONTENT)
  deleteAlbum(@Param() param: AlbumIdParam) {
    this.favoritesService.deleteAlbum(param.albumId);
  }

  @ApiOkResponse({
    description: 'Add artist to favorite',
  })
  @ApiNotFoundResponse({
    description: 'Artist not found',
  })
  @Post('artist/:artistId')
  @HttpCode(StatusCodes.CREATED)
  addArtist(@Param() param: ArtistIdParam) {
    this.favoritesService.addArtist(param.artistId);
  }

  @ApiOkResponse({
    description: 'Delete artist from favorite',
  })
  @ApiNotFoundResponse({
    description: 'Artist not found',
  })
  @Delete('artist/:artistId')
  @HttpCode(StatusCodes.NO_CONTENT)
  deleteArtist(@Param() param: ArtistIdParam) {
    this.favoritesService.deleteArtist(param.artistId);
  }
}
