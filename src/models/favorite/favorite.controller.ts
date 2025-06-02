import {
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import { IsUUIDPipe } from '../../common';
import { AlbumService } from '../album/album.service';
import { ArtistService } from '../artist/artist.service';
import { TrackService } from '../track/track.service';
import { FavoriteService } from './favorite.service';
import { EntityServiceMap } from './interfaces';
import { Entity, EntityItem } from './types';

@Controller('favs')
export class FavoriteController {
  private readonly entitiesServices: EntityServiceMap;

  constructor(
    private readonly service: FavoriteService,
    private readonly albumService: AlbumService,
    private readonly artistService: ArtistService,
    private readonly trackService: TrackService,
  ) {
    this.entitiesServices = {
      artist: this.artistService,
      album: this.albumService,
      track: this.trackService,
    };
  }

  @Get()
  findOne() {
    return this.service.getAll();
  }

  @Post(':entity/:id')
  async add(
    @Param('entity') entity: Entity,
    @Param('id', IsUUIDPipe) id: string,
  ) {
    const entityItem = await this.getEntityById(entity, id);

    if (!entityItem)
      throw new UnprocessableEntityException(
        `Entity with id "${id}" not found`,
      );

    await this.service.add(entity, entityItem);

    return 'Entity added to favorites';
  }

  @Delete(':entity/:id')
  @HttpCode(204)
  async delete(
    @Param('entity') entity: Entity,
    @Param('id', IsUUIDPipe) id: string,
  ) {
    const entityItem = await this.getEntityById(entity, id);

    if (!entityItem)
      throw new NotFoundException(`Entity with id "${id}" not found`);

    await this.service.remove(entity, entityItem);
  }

  async getEntityById(entity: Entity, id: string): Promise<EntityItem | null> {
    const service = this.entitiesServices[entity];

    return await service.getById(id);
  }
}
