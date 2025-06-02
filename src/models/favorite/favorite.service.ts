import { Injectable } from '@nestjs/common';
import { AlbumService } from '../album/album.service';
import { ArtistService } from '../artist/artist.service';
import { TrackService } from '../track/track.service';
import { FavoritesResponse } from './interfaces';
import { Entity, EntityItem } from './types';

@Injectable()
export class FavoriteService {
  private readonly favorites = {
    artists: new Set<string>(),
    albums: new Set<string>(),
    tracks: new Set<string>(),
  };

  constructor(
    private readonly albumService: AlbumService,
    private readonly artistService: ArtistService,
    private readonly trackService: TrackService,
  ) {}

  getAll = async (): Promise<FavoritesResponse> => {
    const [artists, albums, tracks] = await Promise.all([
      this.artistService.findAllByIds([...this.favorites.artists]),
      this.albumService.findAllByIds([...this.favorites.albums]),
      this.trackService.findAllByIds([...this.favorites.tracks]),
    ]);

    return { artists, albums, tracks };
  };

  async add(entity: Entity, entityItem: EntityItem): Promise<void> {
    await this.favorites[entity].add(entityItem.id);
  }

  async remove(entity: Entity, entityItem: EntityItem): Promise<void> {
    await this.favorites[entity].delete(entityItem.id);
  }
}
