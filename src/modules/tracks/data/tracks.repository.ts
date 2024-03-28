import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { Track } from 'src/common/entities/track';
import { PrismaRepository } from 'src/modules/prisma/data/prisma.repository';
import { TrackDto } from '../dto/track.dto';

@Injectable()
export class TracksRepository {
  constructor(private prismaRepository: PrismaRepository) {}

  getAllTracks(): Promise<Track[]> {
    return this.prismaRepository.track.findMany();
  }

  getTrackById(id: string): Promise<Track | null> {
    return this.prismaRepository.track.findUnique({
      where: { id },
    });
  }

  async addTrack(dto: TrackDto): Promise<Track> {
    const newTrack = this.prismaRepository.track.create({
      data: {
        id: uuidv4(),
        name: dto.name,
        artistId: dto.artistId,
        albumId: dto.albumId,
        duration: dto.duration,
      },
    });

    return newTrack;
  }

  changeTrack(id: string, changes: TrackDto): Promise<Track> {
    return this.prismaRepository.track.update({
      where: { id },
      data: changes,
    });
  }

  async deleteTrack(id: string): Promise<void> {
    await this.prismaRepository.track.delete({
      where: { id },
    });
  }

  async deleteArtistFromTracks(artistId: string): Promise<void> {
    await this.prismaRepository.track.updateMany({
      where: { artistId },
      data: { artistId: null },
    });
  }

  async deleteAlbumFromTrack(albumId: string): Promise<void> {
    await this.prismaRepository.track.updateMany({
      where: { albumId },
      data: { albumId: null },
    });
  }
}
