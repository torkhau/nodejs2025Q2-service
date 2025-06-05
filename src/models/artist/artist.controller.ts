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
import { ArtistService } from './artist.service';
import { CreateArtistDto, UpdateArtistDto } from './dto';
import { Artist } from './interfaces';
import { ArtistByIdPipe } from './pipes';

@Controller('artist')
export class ArtistController extends BaseController<Artist, Artist> {
  constructor(protected override readonly service: ArtistService) {
    super(service);
  }

  toDTO(artist: Artist): Artist {
    return artist;
  }

  @Get(':id')
  findOne(@Param('id', IsUUIDPipe, ArtistByIdPipe) artist: Artist) {
    return this.toDTO(artist);
  }

  @Post()
  async create(@Body() createUserDto: CreateArtistDto) {
    const artist = await this.service.create(createUserDto);

    return this.toDTO(artist);
  }

  @Put(':id')
  async update(
    @Param('id', IsUUIDPipe, ArtistByIdPipe) artist: Artist,
    @Body() updateUserDto: UpdateArtistDto,
  ) {
    const updatedUser = await this.service.update(artist.id, updateUserDto);

    return this.toDTO(updatedUser);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', IsUUIDPipe, ArtistByIdPipe) artist: Artist) {
    await this.service.delete(artist.id);
  }
}
