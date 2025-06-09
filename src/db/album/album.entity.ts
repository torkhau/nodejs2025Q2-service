import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Album as IAlbum } from '../../models/album/interfaces';
import { EntityBase } from '../abstract';
import { Artist } from '../artist';

@Entity()
export class Album extends EntityBase implements IAlbum {
  @Column('text')
  name: string;

  @Column('smallint')
  year: number;

  @Column('uuid', { nullable: true })
  artistId: string | null;

  @ManyToOne(() => Artist, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'artistId' })
  artist?: Artist | null;
}
