import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Artist as IArtist } from '../../models/artist/interfaces';

@Entity()
export class Artist implements IArtist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column('boolean')
  grammy: boolean;
}
