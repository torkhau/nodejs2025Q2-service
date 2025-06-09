import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FavArtist } from 'src/db/fav/album';
import { FavAlbum } from 'src/db/fav/artist';
import { FavTrack } from 'src/db/fav/track';
import { Repository } from 'typeorm';
import { FavoritesResponse } from './interfaces';
import { Entity, EntityItem } from './types';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(FavArtist)
    private readonly favArtistRepo: Repository<FavArtist>,

    @InjectRepository(FavAlbum)
    private readonly favAlbumRepo: Repository<FavAlbum>,

    @InjectRepository(FavTrack)
    private readonly favTrackRepo: Repository<FavTrack>,
  ) {}

  async getAll(): Promise<FavoritesResponse> {
    const [favArtists, favAlbums, favTracks] = await Promise.all([
      this.favArtistRepo.find(),
      this.favAlbumRepo.find(),
      this.favTrackRepo.find(),
    ]);

    return {
      artists: favArtists.map(({ artist }) => artist),
      albums: favAlbums.map(({ album }) => album),
      tracks: favTracks.map(({ track }) => track),
    };
  }

  async add(entity: Entity, entityItem: EntityItem): Promise<void> {
    const repository = this.getRepository(entity);
    const favEntity = repository.create({ [entity]: entityItem });

    await repository.save(favEntity);
  }

  async remove(entity: Entity, entityItem: EntityItem): Promise<void> {
    const repository = this.getRepository(entity);
    await repository.delete({ [entity]: entityItem });
  }

  private getRepository(entity: Entity): Repository<unknown> {
    switch (entity) {
      case 'artist':
        return this.favArtistRepo;
      case 'album':
        return this.favAlbumRepo;
      case 'track':
        return this.favTrackRepo;
    }
  }
}
