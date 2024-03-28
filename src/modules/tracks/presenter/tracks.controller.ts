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
import { TracksService } from '../service/tracks.service';
import { GetAllTracksResponse } from './responses/get-all-tracks.response';
import { TrackResponse } from './responses/track.response';
import { TrackIdParam } from './params/track-id.param';
import { CreateTrackBody } from './bodies/create-track.body';
import { ChangeTrackBody } from './bodies/change-track.body';
import { StatusCodes } from 'http-status-codes';
import { TrackResource } from './resources/track.resource';

@ApiTags('Tracks')
@Controller('/track')
export class TracksController {
  constructor(
    private readonly tracksService: TracksService,
    private readonly trackResource: TrackResource,
  ) {}

  @ApiOkResponse({
    description: 'Returns all tracks',
    type: GetAllTracksResponse,
  })
  @Get()
  async getAllTracks(): Promise<TrackResponse[]> {
    const tracks = await this.tracksService.getAllTracks();

    return tracks.map((track) => this.trackResource.convert(track));
  }

  @ApiOkResponse({
    type: TrackResponse,
    description: 'Get a track by id',
  })
  @ApiNotFoundResponse({
    description: 'Track not found',
  })
  @Get(':trackId')
  async getTrackById(@Param() param: TrackIdParam): Promise<TrackResponse> {
    const track = await this.tracksService.getTrackById(param.trackId);

    return this.trackResource.convert(track);
  }

  @ApiOkResponse({
    description: 'Add a new track',
    type: TrackResponse,
  })
  @Post()
  @HttpCode(StatusCodes.CREATED)
  async createTrack(@Body() body: CreateTrackBody): Promise<TrackResponse> {
    const track = await this.tracksService.addTrack(body);

    return this.trackResource.convert(track);
  }

  @ApiOkResponse({
    description: 'Update a track',
    type: TrackResponse,
  })
  @ApiNotFoundResponse({
    description: 'Track not found',
  })
  @Put(':trackId')
  async changeTrack(
    @Param() param: TrackIdParam,
    @Body() body: ChangeTrackBody,
  ): Promise<TrackResponse> {
    const track = await this.tracksService.changeTrack(param.trackId, body);

    return this.trackResource.convert(track);
  }

  @ApiOkResponse({
    description: 'Delete a track',
  })
  @ApiNotFoundResponse({
    description: 'Track not found',
  })
  @Delete(':trackId')
  @HttpCode(StatusCodes.NO_CONTENT)
  async deleteTrack(@Param() param: TrackIdParam): Promise<void> {
    await this.tracksService.deleteTrack(param.trackId);
  }
}
