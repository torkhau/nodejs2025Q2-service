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
import { CreateTrackDto, UpdateTrackDto } from './dto';
import { Track } from './interfaces';
import { TrackByIdPipe } from './pipes';
import { TrackService } from './track.service';

@Controller('track')
export class TrackController extends BaseController<Track, Track> {
  constructor(protected override readonly service: TrackService) {
    super(service);
  }

  toDTO(track: Track): Track {
    return track;
  }

  @Get(':id')
  findOne(@Param('id', IsUUIDPipe, TrackByIdPipe) track: Track) {
    return this.toDTO(track);
  }

  @Post()
  async create(@Body() createTrackDto: CreateTrackDto) {
    const track = await this.service.create(createTrackDto);

    return this.toDTO(track);
  }

  @Put(':id')
  async update(
    @Param('id', IsUUIDPipe, TrackByIdPipe) track: Track,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    const updatedUser = await this.service.update(track.id, updateTrackDto);

    return this.toDTO(updatedUser);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', IsUUIDPipe, TrackByIdPipe) track: Track) {
    await this.service.delete(track.id);
  }
}
