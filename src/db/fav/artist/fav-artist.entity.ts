import { EntityBase } from 'src/db/abstract';
import { Artist } from 'src/db/artist';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class FavArtist extends EntityBase {
  @Column('uuid')
  artistId: string;

  @ManyToOne(() => Artist, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'artistId' })
  artist: Artist;
}
