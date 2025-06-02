import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { BaseService } from '../abstract';
import { FavoriteService } from '../favorite/favorite.service';
import { Album } from './interfaces';
import { TrackService } from '../track/track.service';

@Injectable()
export class AlbumService extends BaseService<Album> {
  protected readonly entityName = 'album';

  constructor(
    @Inject(forwardRef(() => FavoriteService))
    private readonly favoriteService: FavoriteService,
    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
  ) {
    super();
  }

  async delete(id: string): Promise<void> {
    const album = await super.getById(id);

    await this.favoriteService.remove(this.entityName, album);
    await this.trackService.deleteAlbum(id);
    await super.delete(id);
  }

  async deleteArtist(artistId: string): Promise<void> {
    this.items.forEach((item) => {
      if (item.artistId === artistId) item.artistId = null;
    });
  }
}
