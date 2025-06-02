import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { BaseService } from '../abstract';
import { FavoriteService } from '../favorite/favorite.service';
import { Artist } from './interfaces';

@Injectable()
export class ArtistService extends BaseService<Artist> {
  protected readonly entityName = 'artist';

  constructor(
    @Inject(forwardRef(() => FavoriteService))
    private readonly favoriteService: FavoriteService,
  ) {
    super();
  }

  async delete(id: string): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const artist = await super.getById(id);

    // await this.favoriteService.remove(this.entityName, artist);
    await super.delete(id);
  }
}
