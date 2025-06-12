import { Type } from 'class-transformer';
import { IsNumber, IsString, ValidateIf } from 'class-validator';
import { Track } from '../interfaces';

interface ICreateTrackDto extends Omit<Track, 'id'> {}

export class CreateTrackDto implements ICreateTrackDto {
  @IsString()
  name: string;

  @ValidateIf((_, value) => value !== null)
  @IsString()
  artistId: string | null;

  @ValidateIf((_, value) => value !== null)
  @IsString()
  albumId: string | null;

  @Type(() => Number)
  @IsNumber()
  duration: number;
}
