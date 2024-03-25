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
import { Artist } from 'src/common/entities/artist';
import { ArtistsService } from '../service/artists.service';
import { GetAllArtistsResponse } from './responses/get-all-artists.response';
import { ArtistIdParam } from './params/artist-id.param';
import { ArtistResponse } from './responses/artist.response';
import { CreateArtistBody } from './bodies/create-artist.body';
import { ChangeArtistBody } from './bodies/change-artist.body';
import { StatusCodes } from 'http-status-codes';

@ApiTags('Artists')
@Controller('/artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @ApiOkResponse({
    type: GetAllArtistsResponse,
    description: 'List of artists',
  })
  @Get()
  getAllArtists(): Promise<Artist[]> {
    return this.artistsService.getAllArtists();
  }

  @ApiOkResponse({
    type: ArtistResponse,
    description: 'Create new artist',
  })
  @Post()
  @HttpCode(StatusCodes.CREATED)
  addArtist(@Body() artist: CreateArtistBody): Promise<Artist> {
    return this.artistsService.addArtist(artist);
  }

  @ApiOkResponse({
    type: ArtistResponse,
    description: 'Get artist by id',
  })
  @ApiNotFoundResponse({
    description: 'Artist not found',
  })
  @Get(':artistId')
  getArtistById(@Param() param: ArtistIdParam): Promise<Artist> {
    return this.artistsService.getArtistById(param.artistId);
  }

  @ApiOkResponse({
    type: ArtistResponse,
    description: 'Update artist',
  })
  @ApiNotFoundResponse({
    description: 'Artist not found',
  })
  @Put(':artistId')
  updateArtist(
    @Param() param: ArtistIdParam,
    @Body() artist: ChangeArtistBody,
  ): Promise<Artist> {
    return this.artistsService.updateArtist(param.artistId, artist);
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
