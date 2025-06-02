import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { BaseService } from '../abstract';
import { FavoriteService } from '../favorite/favorite.service';
import { Album } from './interfaces';

@Injectable()
export class AlbumService extends BaseService<Album> {
  protected readonly entityName = 'album';

  constructor(
    @Inject(forwardRef(() => FavoriteService))
    private readonly favoriteService: FavoriteService,
  ) {
    super();
  }

  async delete(id: string): Promise<void> {
    const album = await super.getById(id);

    await this.favoriteService.remove(this.entityName, album);
    await super.delete(id);
  }
}
