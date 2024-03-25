import { Track } from 'src/common/entities/track';
import { TrackResponse } from '../responses/track.response';

export class TrackResource {
  convert(track: Track): TrackResponse {
    return {
      id: track.id,
      name: track.name,
      duration: track.duration,
      artistId: track.artistId,
      albumId: track.albumId,
    };
  }
}
