import { AlbumService } from 'src/models/album/album.service';
import { ArtistService } from 'src/models/artist/artist.service';
import { TrackService } from 'src/models/track/track.service';

export interface EntityServiceMap {
  album: AlbumService;
  artist: ArtistService;
  track: TrackService;
}
