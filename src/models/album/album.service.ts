import { Injectable } from '@nestjs/common';
import { BaseService } from '../abstract';
import { Album } from './interfaces';

@Injectable()
export class AlbumService extends BaseService<Album> {}
