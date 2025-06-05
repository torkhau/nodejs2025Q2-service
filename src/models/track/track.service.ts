import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { BaseService } from '../abstract';
import { FavoriteService } from '../favorite/favorite.service';
import { Track } from './interfaces';

@Injectable()
export class TrackService extends BaseService<Track> {
  protected readonly entityName = 'track';

  constructor(
    @Inject(forwardRef(() => FavoriteService))
    private readonly favoriteService: FavoriteService,
  ) {
    super();
  }

  async delete(id: string): Promise<void> {
    const track = await super.getById(id);

    await this.favoriteService.remove(this.entityName, track);
    await super.delete(id);
  }

  async deleteArtist(artistId: string): Promise<void> {
    this.items.forEach((item) => {
      if (item.artistId === artistId) item.artistId = null;
    });
  }

  async deleteAlbum(albumId: string): Promise<void> {
    this.items.forEach((item) => {
      if (item.albumId === albumId) item.albumId = null;
    });
  }
}
