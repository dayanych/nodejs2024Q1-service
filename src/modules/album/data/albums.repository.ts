import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { Album } from 'src/common/entities/album';
import { PrismaRepository } from 'src/modules/prisma/data/prisma.repository';

@Injectable()
export class AlbumsRepository {
  constructor(private prismaRepository: PrismaRepository) {}

  getAllAlbums(): Promise<Album[]> {
    return this.prismaRepository.album.findMany();
  }

  getAlbumById(id: string): Promise<Album | null> {
    return this.prismaRepository.album.findUnique({
      where: {
        id,
      },
    });
  }

  async addAlbum(album: {
    name: string;
    year: number;
    artistId: string;
  }): Promise<Album> {
    const newAlbum = await this.prismaRepository.album.create({
      data: {
        id: uuidv4(),
        name: album.name,
        year: album.year,
        artistId: album.artistId,
      },
    });

    return newAlbum;
  }

  changeAlbum(
    id: string,
    changes: { name: string; year: number },
  ): Promise<Album | null> {
    return this.prismaRepository.album.update({
      where: {
        id,
      },
      data: changes,
    });
  }

  async deleteAlbum(id: string): Promise<void> {
    await this.prismaRepository.album.delete({ where: { id } });
  }

  async deleteArtistFromAlbum(artistId: string): Promise<void> {
    await this.prismaRepository.album.updateMany({
      where: {
        artistId,
      },
      data: {
        artistId: null,
      },
    });
  }
}
