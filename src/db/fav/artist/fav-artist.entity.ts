import { EntityBase } from 'src/db/abstract';
import { Album } from 'src/db/album';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity()
export class FavAlbum extends EntityBase {
  @Column('uuid', { unique: true })
  albumId: string;

  @OneToOne(() => Album, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'albumId' })
  album: Album;
}
