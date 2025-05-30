import { Injectable } from '@nestjs/common';
import { BaseService } from '../abstract';
import { Track } from './interfaces';

@Injectable()
export class TrackService extends BaseService<Track> {}
