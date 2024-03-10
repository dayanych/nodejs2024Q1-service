import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { Artist } from 'src/common/entities/artist';

@Injectable()
export class ArtistsRepository {
  private artists: Artist[] = [];

  getAllArtists(): Artist[] {
    return this.artists;
  }

  getArtistById(id: string): Artist | undefined {
    const artist = this.artists.find((artist) => artist.id === id);

    return artist;
  }

  addArtist(artist: { name: string; grammy: boolean }): Artist {
    const newArtist = {
      id: uuidv4(),
      name: artist.name,
      grammy: artist.grammy,
    };

    this.artists.push(newArtist);

    return newArtist;
  }

  updateArtist(id: string, changes: { name: string; grammy: boolean }): Artist {
    const artist = this.artists.find((artist) => artist.id === id);

    artist.name = changes.name;
    artist.grammy = changes.grammy;

    return artist;
  }

  deleteArtist(id: string) {
    this.artists = this.artists.filter((artist) => artist.id !== id);
  }
}
