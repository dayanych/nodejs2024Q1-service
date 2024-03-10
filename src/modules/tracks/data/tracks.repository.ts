import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { Track } from 'src/common/entities/track';

@Injectable()
export class TracksRepository {
  private tracks: Track[] = [];

  getAllTracks(): Track[] {
    return this.tracks;
  }

  getTrackById(id: string): Track {
    return this.tracks.find((track) => track.id === id);
  }

  addTrack(dto: Omit<Track, 'id'>): Track {
    const newTrack: Track = {
      id: uuidv4(),
      name: dto.name,
      artistId: dto.artistId,
      albumId: dto.albumId,
      duration: dto.duration,
    };

    this.tracks.push(newTrack);

    return newTrack;
  }

  changeTrack(id: string, changes: Omit<Track, 'id'>): Track {
    this.tracks = this.tracks.map((track) => {
      if (track.id === id) {
        return {
          ...track,
          ...changes,
        };
      }

      return track;
    });

    return this.getTrackById(id);
  }

  deleteTrack(id: string): void {
    this.tracks = this.tracks.filter((track) => track.id !== id);
  }

  deleteArtistFromTracks(artistId: string): void {
    this.tracks = this.tracks.map((track) => {
      if (track.artistId === artistId) {
        return {
          ...track,
          artistId: null,
        };
      }

      return track;
    });
  }

  deleteAlbumFromTrack(albumId: string): void {
    this.tracks = this.tracks.map((track) => {
      if (track.albumId === albumId) {
        return {
          ...track,
          albumId: null,
        };
      }

      return track;
    });
  }
}
