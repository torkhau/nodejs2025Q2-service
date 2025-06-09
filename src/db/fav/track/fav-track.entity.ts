import { EntityBase } from 'src/db/abstract';
import { Track } from 'src/db/track';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity()
export class FavTrack extends EntityBase {
  @Column('uuid', { unique: true })
  trackId: string;

  @OneToOne(() => Track, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'trackId' })
  track: Track;
}
