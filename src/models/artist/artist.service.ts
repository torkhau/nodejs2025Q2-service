import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { BaseService } from '../abstract';
import { FavoriteService } from '../favorite/favorite.service';
import { Artist } from './interfaces';
import { AlbumService } from '../album/album.service';
import { TrackService } from '../track/track.service';

@Injectable()
export class ArtistService extends BaseService<Artist> {
  protected readonly entityName = 'artist';

  constructor(
    @Inject(forwardRef(() => FavoriteService))
    private readonly favoriteService: FavoriteService,
    @Inject(forwardRef(() => AlbumService))
    private readonly albumService: AlbumService,
    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
  ) {
    super();
  }

  async delete(id: string): Promise<void> {
    const artist = await super.getById(id);

    await this.favoriteService.remove(this.entityName, artist);
    await this.albumService.deleteArtist(id);
    await this.trackService.deleteArtist(id);
    await super.delete(id);
  }
}
