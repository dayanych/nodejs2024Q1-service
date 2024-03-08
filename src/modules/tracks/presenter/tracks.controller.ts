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
import { Track } from 'src/common/entities/track';
import { GetAllTracksResponse } from './responses/get-all-tracks.response';
import { TrackResponse } from './responses/track.response';
import { TrackIdParam } from './params/track-id.param';
import { CreateTrackBody } from './bodies/create-track.body';
import { ChangeTrackBody } from './bodies/change-track.body';
import { StatusCodes } from 'http-status-codes';

@ApiTags('Tracks')
@Controller('/track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @ApiOkResponse({
    description: 'Returns all tracks',
    type: GetAllTracksResponse,
  })
  @Get()
  getAllTracks(): Track[] {
    return this.tracksService.getAllTracks();
  }

  @ApiOkResponse({
    type: TrackResponse,
    description: 'Get a track by id',
  })
  @ApiNotFoundResponse({
    description: 'Track not found',
  })
  @Get(':trackId')
  getTrackById(@Param() param: TrackIdParam): Track {
    return this.tracksService.getTrackById(param.trackId);
  }

  @ApiOkResponse({
    description: 'Add a new track',
    type: TrackResponse,
  })
  @Post()
  @HttpCode(StatusCodes.CREATED)
  createTrack(@Body() body: CreateTrackBody): Track {
    return this.tracksService.addTrack(body);
  }

  @ApiOkResponse({
    description: 'Update a track',
    type: TrackResponse,
  })
  @ApiNotFoundResponse({
    description: 'Track not found',
  })
  @Put(':trackId')
  changeTrack(
    @Param() param: TrackIdParam,
    @Body() body: ChangeTrackBody,
  ): Track {
    return this.tracksService.changeTrack(param.trackId, body);
  }

  @ApiOkResponse({
    description: 'Delete a track',
  })
  @ApiNotFoundResponse({
    description: 'Track not found',
  })
  @Delete(':trackId')
  @HttpCode(StatusCodes.NO_CONTENT)
  deleteTrack(@Param() param: TrackIdParam): void {
    this.tracksService.deleteTrack(param.trackId);
  }
}
