import { Album } from '../album/interfaces';
import { Artist } from '../artist/interfaces';
import { Track } from '../track/interfaces';

export type Entity = 'album' | 'artist' | 'track';

export type EntityItem = Album | Artist | Track;
