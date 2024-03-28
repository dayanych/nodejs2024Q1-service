import { ApiProperty } from '@nestjs/swagger';
import { TrackResponse } from './track.response';

export class GetAllTracksResponse {
  @ApiProperty()
  tracks: TrackResponse[];
}
