import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Track as ITrack } from '../../models/track/interfaces';
import { EntityBase } from '../abstract';
import { Album } from '../album';
import { Artist } from '../artist';

@Entity()
export class Tract extends EntityBase implements ITrack {
  @Column('text')
  name: string;

  @Column('uuid', { nullable: true })
  artistId: string | null;

  @ManyToOne(() => Artist, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'artistId' })
  artist: Artist | null;

  @Column('uuid', { nullable: true })
  albumId: string | null;

  @ManyToOne(() => Album, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'albumId' })
  album: Album | null;

  @Column('smallint')
  duration: number;
}
