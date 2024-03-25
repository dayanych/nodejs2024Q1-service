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
import { ChangeAlbumBody } from './bodies/change-album.body';
import { AlbumResource } from './resources/album.resource';

@ApiTags('Albums')
@Controller('album')
export class AlbumsController {
  constructor(
    private readonly albumsService: AlbumsService,
    private readonly albumResource: AlbumResource,
  ) {}

  @ApiOkResponse({
    description: 'Returns all albums',
    type: GetAllAlbumsResponse,
  })
  @Get()
  async getAllAlbums(): Promise<AlbumResponse[]> {
    const albums = await this.albumsService.getAllAlbums();

    return albums.map((album) => this.albumResource.convert(album));
  }

  @ApiOkResponse({
    type: AlbumResponse,
    description: 'Returns all albums',
  })
  @Post()
  @HttpCode(StatusCodes.CREATED)
  async addAlbum(@Body() body: CreateAlbumBody): Promise<AlbumResponse> {
    const payload = {
      name: body.name,
      year: body.year,
      artistId: body.artistId,
    };

    const albums = await this.albumsService.addAlbum(payload);

    return this.albumResource.convert(albums);
  }

  @ApiOkResponse({
    type: AlbumResponse,
    description: 'Get album by id',
  })
  @ApiNotFoundResponse({
    description: 'Album not found',
  })
  @Get(':albumId')
  async getAlbumById(@Param() param: AlbumIdParam): Promise<AlbumResponse> {
    const album = await this.albumsService.getAlbumById(param.albumId);

    return this.albumResource.convert(album);
  }

  @ApiOkResponse({
    type: AlbumResponse,
    description: 'Update album',
  })
  @ApiNotFoundResponse({
    description: 'Album not found',
  })
  @Put(':albumId')
  async updateAlbum(
    @Param() param: AlbumIdParam,
    @Body() body: ChangeAlbumBody,
  ): Promise<AlbumResponse> {
    const album = await this.albumsService.updateAlbum(param.albumId, body);

    return this.albumResource.convert(album);
  }

  @ApiOkResponse({
    description: 'Delete artist',
  })
  @ApiNotFoundResponse({
    description: 'Artist not found',
  })
  @Delete(':albumId')
  @HttpCode(StatusCodes.NO_CONTENT)
  async deleteArtist(@Param() param: AlbumIdParam): Promise<void> {
    await this.albumsService.deleteAlbum(param.albumId);
  }
}
