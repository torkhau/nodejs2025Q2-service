import { EntityBase } from 'src/db/abstract';
import { Artist } from 'src/db/artist';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity()
export class FavArtist extends EntityBase {
  @Column('uuid', { unique: true })
  artistId: string;

  @OneToOne(() => Artist, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'artistId' })
  artist: Artist;
}
