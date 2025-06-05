import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { AlbumService } from '../album/album.service';
import { ArtistService } from '../artist/artist.service';
import { TrackService } from '../track/track.service';
import { FavoritesResponse } from './interfaces';
import { Entity, EntityItem } from './types';

@Injectable()
export class FavoriteService {
  private readonly favorites: Record<Entity, Set<string>> = {
    artist: new Set<string>(),
    album: new Set<string>(),
    track: new Set<string>(),
  };

  constructor(
    @Inject(forwardRef(() => AlbumService))
    private readonly albumService: AlbumService,
    @Inject(forwardRef(() => ArtistService))
    private readonly artistService: ArtistService,
    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
  ) {}

  getAll = async (): Promise<FavoritesResponse> => {
    const [artists, albums, tracks] = await Promise.all([
      this.artistService.findAllByIds([...this.favorites.artist]),
      this.albumService.findAllByIds([...this.favorites.album]),
      this.trackService.findAllByIds([...this.favorites.track]),
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
