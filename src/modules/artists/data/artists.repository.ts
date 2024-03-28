import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { Artist } from 'src/common/entities/artist';
import { PrismaRepository } from 'src/modules/prisma/data/prisma.repository';

@Injectable()
export class ArtistsRepository {
  constructor(private prismaRepository: PrismaRepository) {}

  getAllArtists(): Promise<Artist[]> {
    return this.prismaRepository.artist.findMany();
  }

  getArtistById(id: string): Promise<Artist | null> {
    return this.prismaRepository.artist.findUnique({
      where: {
        id,
      },
    });
  }

  async addArtist(artist: { name: string; grammy: boolean }): Promise<Artist> {
    const newArtist = await this.prismaRepository.artist.create({
      data: {
        id: uuidv4(),
        name: artist.name,
        grammy: artist.grammy,
      },
    });

    return newArtist;
  }

  updateArtist(
    id: string,
    changes: { name: string; grammy: boolean },
  ): Promise<Artist | null> {
    return this.prismaRepository.artist.update({
      where: {
        id: id,
      },
      data: changes,
    });
  }

  async deleteArtist(id: string): Promise<void> {
    await this.prismaRepository.artist.delete({ where: { id } });
  }
}
