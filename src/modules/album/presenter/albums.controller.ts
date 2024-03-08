import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AlbumsService } from '../service/albums.service';
import { GetAllAlbumsResponse } from './responses/get-all-album.response';
import { AlbumIdParam } from './params/album-id.param';
import { AlbumResponse } from './responses/album.response';
import { CreateAlbumBody } from './bodies/create-album.body';
import { StatusCodes } from 'http-status-codes';
import { Album } from 'src/common/entities/album';
import { ChangeAlbumBody } from './bodies/change-album.body';

@ApiTags('Albums')
@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @ApiOkResponse({
    description: 'Returns all albums',
    type: GetAllAlbumsResponse,
  })
  @Get()
  getAllAlbums(): Album[] {
    return this.albumsService.getAllAlbums();
  }

  @ApiOkResponse({
    type: GetAllAlbumsResponse,
    description: 'Returns all albums',
  })
  @Post()
  @HttpCode(StatusCodes.CREATED)
  addAlbum(@Body() album: CreateAlbumBody): Album {
    const payload = {
      name: album.name,
      year: album.year,
      artistId: album.artistId,
    };

    return this.albumsService.addAlbum(payload);
  }

  @ApiOkResponse({
    type: AlbumResponse,
    description: 'Get album by id',
  })
  @ApiNotFoundResponse({
    description: 'Album not found',
  })
  @Get(':album_id')
  getAlbumById(@Param() param: AlbumIdParam): Album {
    return this.albumsService.getAlbumById(param.album_id);
  }

  @ApiOkResponse({
    type: AlbumResponse,
    description: 'Update album',
  })
  @ApiNotFoundResponse({
    description: 'Album not found',
  })
  @Put(':album_id')
  updateAlbum(
    @Param() param: AlbumIdParam,
    @Body() body: ChangeAlbumBody,
  ): Album {
    return this.albumsService.updateAlbum(param.album_id, body);
  }

  @ApiOkResponse({
    description: 'Delete artist',
  })
  @ApiNotFoundResponse({
    description: 'Artist not found',
  })
  @Delete(':album_id')
  @HttpCode(StatusCodes.NO_CONTENT)
  deleteArtist(@Param() param: AlbumIdParam): void {
    this.albumsService.deleteAlbum(param.album_id);
  }
}
