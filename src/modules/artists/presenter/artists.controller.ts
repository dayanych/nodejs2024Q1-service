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
import { ArtistsService } from '../service/artists.service';
import { GetAllArtistsResponse } from './responses/get-all-artists.response';
import { ArtistIdParam } from './params/artist-id.param';
import { ArtistResponse } from './responses/artist.response';
import { CreateArtistBody } from './bodies/create-artist.body';
import { ChangeArtistBody } from './bodies/change-artist.body';
import { StatusCodes } from 'http-status-codes';
import { ArtistResource } from './resources/artist.resource';

@ApiTags('Artists')
@Controller('/artist')
export class ArtistsController {
  constructor(
    private readonly artistsService: ArtistsService,
    private readonly artistResource: ArtistResource,
  ) {}

  @ApiOkResponse({
    type: GetAllArtistsResponse,
    description: 'List of artists',
  })
  @Get()
  async getAllArtists(): Promise<ArtistResponse[]> {
    const artists = await this.artistsService.getAllArtists();

    return artists.map((artist) => this.artistResource.convert(artist));
  }

  @ApiOkResponse({
    type: ArtistResponse,
    description: 'Create new artist',
  })
  @Post()
  @HttpCode(StatusCodes.CREATED)
  async addArtist(@Body() body: CreateArtistBody): Promise<ArtistResponse> {
    const artist = await this.artistsService.addArtist(body);

    return this.artistResource.convert(artist);
  }

  @ApiOkResponse({
    type: ArtistResponse,
    description: 'Get artist by id',
  })
  @ApiNotFoundResponse({
    description: 'Artist not found',
  })
  @Get(':artistId')
  async getArtistById(@Param() param: ArtistIdParam): Promise<ArtistResponse> {
    const artist = await this.artistsService.getArtistById(param.artistId);

    return this.artistResource.convert(artist);
  }

  @ApiOkResponse({
    type: ArtistResponse,
    description: 'Update artist',
  })
  @ApiNotFoundResponse({
    description: 'Artist not found',
  })
  @Put(':artistId')
  async updateArtist(
    @Param() param: ArtistIdParam,
    @Body() body: ChangeArtistBody,
  ): Promise<ArtistResponse> {
    const artist = await this.artistsService.updateArtist(param.artistId, body);

    return this.artistResource.convert(artist);
  }

  @ApiOkResponse({
    description: 'Delete artist',
  })
  @ApiNotFoundResponse({
    description: 'Artist not found',
  })
  @Delete(':artistId')
  @HttpCode(StatusCodes.NO_CONTENT)
  async deleteArtist(@Param() param: ArtistIdParam): Promise<void> {
    await this.artistsService.deleteArtist(param.artistId);
  }
}
