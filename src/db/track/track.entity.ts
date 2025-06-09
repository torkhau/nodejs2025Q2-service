import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Track as ITrack } from '../../models/track/interfaces';
import { Artist } from '../artist';
import { Album } from '../album';

@Entity()
export class Tract implements ITrack {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
