import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Track } from '../interfaces';

interface IUpdateTrackDTO extends Partial<Omit<Track, 'id'>> {}

export class UpdateTrackDto implements IUpdateTrackDTO {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  artistId: string | null;

  @IsOptional()
  @IsString()
  albumId: string | null;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  duration: number;
}
