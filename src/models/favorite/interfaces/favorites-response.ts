import { Album } from 'src/models/album/interfaces';
import { Artist } from 'src/models/artist/interfaces';
import { Track } from 'src/models/track/interfaces';

export interface FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
