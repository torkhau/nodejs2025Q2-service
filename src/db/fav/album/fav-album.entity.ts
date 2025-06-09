import { EntityBase } from 'src/db/abstract';
import { Album } from 'src/db/album';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class FavAlbum extends EntityBase {
  @Column('uuid')
  albumId: string;

  @ManyToOne(() => Album, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'albumId' })
  album: Album;
}
