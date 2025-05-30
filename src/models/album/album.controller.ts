import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { IsUUIDPipe } from '../../common';
import { BaseController } from '../abstract';
import { AlbumService } from './album.service';
import { CreateAlbumDto, UpdateAlbumDto } from './dto';
import { Album } from './interfaces';
import { AlbumByIdPipe } from './pipes';

@Controller('album')
export class AlbumController extends BaseController<Album, Album> {
  constructor(protected override readonly service: AlbumService) {
    super(service);
  }

  toDTO(album: Album): Album {
    return album;
  }

  @Get(':id')
  findOne(@Param('id', IsUUIDPipe, AlbumByIdPipe) album: Album) {
    return this.toDTO(album);
  }

  @Post()
  async create(@Body() createAlbumDto: CreateAlbumDto) {
    const album = await this.service.create(createAlbumDto);

    return this.toDTO(album);
  }

  @Put(':id')
  async update(
    @Param('id', IsUUIDPipe, AlbumByIdPipe) album: Album,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    const updatedUser = await this.service.update(album.id, updateAlbumDto);

    return this.toDTO(updatedUser);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', IsUUIDPipe, AlbumByIdPipe) album: Album) {
    await this.service.delete(album.id);
  }
}
