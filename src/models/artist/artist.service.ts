import { Injectable } from '@nestjs/common';
import { BaseService } from '../abstract';
import { Artist } from './interfaces';

@Injectable()
export class ArtistService extends BaseService<Artist> {}
