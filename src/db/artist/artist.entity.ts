import { Column, Entity } from 'typeorm';
import { Artist as IArtist } from '../../models/artist/interfaces';
import { EntityBase } from '../abstract';

@Entity()
export class Artist extends EntityBase implements IArtist {
  @Column('text')
  name: string;

  @Column('boolean')
  grammy: boolean;
}
